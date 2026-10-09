import type { CSSProperties } from "react";

/** Five separate structural levels share the room's isometric projection. */
export function ConstructionBuilding() {
  return (
    <g className="construction-building">
      <g className="construction-building-site">
        <path
          d="M128 324 340 232 552 324 340 418Z"
          fill="var(--construction-shadow)"
          opacity=".5"
        />
        <path
          d="M152 315 340 233 528 315 340 399Z"
          fill="none"
          stroke="var(--construction-line)"
          strokeDasharray="4 6"
        />
        <path
          d="M170 318 340 244 510 318 340 393Z"
          fill="var(--construction-concrete)"
        />
        <path
          d="M170 318V328L340 403V393Z"
          fill="var(--construction-building-left)"
        />
        <path
          d="M340 393V403L510 328V318Z"
          fill="var(--construction-building-right)"
        />
        <path
          d="M142 340 326 421M139 333 145 347M323 414 329 428M354 421 539 340M351 414 357 428M536 333 542 347"
          fill="none"
          stroke="var(--construction-copper)"
        />
      </g>

      {[0, 1, 2, 3, 4].map((floor) => (
        <g key={floor} transform={`translate(0 ${-44 * floor})`}>
          <g
            className="construction-building-floor"
            data-storey={floor + 1}
            style={{ "--storey": floor + 1 } as CSSProperties}
          >
            <path
              d="M190 315 340 250 490 315 340 380Z"
              fill="var(--construction-concrete)"
            />
            <path
              d="M190 315V321L340 386V380Z"
              fill="var(--construction-building-left)"
            />
            <path
              d="M340 380V386L490 321V315Z"
              fill="var(--construction-building-right)"
            />
            <path
              d="M190 315V271M240 337V293M290 358V314M340 380V336M390 358V314M440 337V293M490 315V271M340 250V206"
              fill="none"
              stroke="var(--construction-structure)"
              strokeWidth="5"
            />
            <path
              d="M190 271 340 206 490 271 340 336Z"
              fill="none"
              stroke="var(--construction-structure)"
              strokeWidth="3"
            />

            <g className="construction-building-envelope">
              <path
                d="M190 271 340 336V380L190 315Z"
                fill="var(--construction-building-left)"
              />
              <path
                d="M340 336 490 271V315L340 380Z"
                fill="var(--construction-building-right)"
              />
              <path
                d="M207 286 235 298V322L207 310ZM252 305 280 317V341L252 329ZM297 325 325 337V361L297 349Z"
                fill="var(--construction-building-glass)"
              />
              <path
                d="M356 337 384 325V349L356 361ZM400 318 432 304V328L400 342ZM449 297 477 285V309L449 321Z"
                fill="var(--construction-building-glass)"
              />
              <path
                d="M221 292V316M266 311V335M311 331V355M370 331V355M416 311V335M463 291V315"
                stroke="var(--construction-wall-edge)"
                strokeWidth="1.5"
              />
              <path
                d="M190 314 340 379 490 314"
                fill="none"
                stroke="var(--construction-wall-edge)"
                strokeWidth="2"
              />
              {floor === 2 && (
                <path
                  className="construction-building-destination"
                  d="M400 318 432 304V328L400 342Z"
                  fill="var(--construction-sun)"
                  stroke="var(--construction-copper)"
                  strokeWidth="2"
                />
              )}
            </g>
          </g>
        </g>
      ))}

      <g className="construction-building-roof">
        <path
          d="M184 93 340 25 496 93 340 161Z"
          fill="var(--construction-concrete)"
        />
        <path
          d="M184 93V101L340 169V161Z"
          fill="var(--construction-building-left)"
        />
        <path
          d="M340 161V169L496 101V93Z"
          fill="var(--construction-building-right)"
        />
        <path
          d="M206 93 340 35 474 93 340 151Z"
          fill="none"
          stroke="var(--construction-structure)"
          strokeWidth="2"
        />
        <path
          d="M308 83 344 67 377 81 341 97Z"
          fill="var(--construction-building-glass)"
          opacity=".55"
        />
      </g>
    </g>
  );
}
