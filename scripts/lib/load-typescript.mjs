import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import ts from "typescript";

/** Load the project's data modules for checks without generating build files. */
export function createTypeScriptLoader(root) {
  const cache = new Map();
  function load(filename) {
    const file = resolve(
      root,
      /\.tsx?$/.test(filename) ? filename : `${filename}.ts`
    );
    if (cache.has(file)) return cache.get(file).exports;
    const loaded = { exports: {} };
    cache.set(file, loaded);
    const nativeRequire = createRequire(file);
    const require = (specifier) => {
      if (specifier.startsWith("@/")) return load(specifier.slice(2));
      if (specifier.startsWith("."))
        return load(resolve(dirname(file), specifier));
      return nativeRequire(specifier);
    };
    const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    });
    new Function("require", "module", "exports", outputText)(
      require,
      loaded,
      loaded.exports
    );
    return loaded.exports;
  }
  return load;
}
