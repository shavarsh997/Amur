import "./construction-backdrop.css";
import "./content-layout.css";
import { ConstructionBuilding } from "./construction-building";

/** Decorative vector artwork, rendered on the server and excluded from the accessibility tree. */
export function ConstructionBackdrop({
  placement = "page",
}: {
  placement?: "page" | "header";
}) {
  const idPrefix = `construction-${placement}`;
  return (
    <div
      aria-hidden="true"
      className={`construction-backdrop construction-backdrop--${placement}`}
      data-construction-backdrop=""
      data-build-stage="0"
      data-building-level="0"
      data-building-finished="false"
    >
      <div className="construction-backdrop__sticky">
        <svg
          className="construction-scene"
          viewBox="75 12 530 425"
          aria-hidden="true"
          focusable="false"
        >
          <ConstructionBuilding />
          <g className="construction-interior">
            <defs>
              <pattern
                id={`${idPrefix}-plan-grid`}
                width="26"
                height="26"
                patternUnits="userSpaceOnUse"
                patternTransform="matrix(1 .44 -1 .44 340 190)"
              >
                <path
                  d="M26 0H0V26"
                  fill="none"
                  stroke="var(--construction-grid)"
                  strokeWidth="1"
                />
              </pattern>
              <clipPath id={`${idPrefix}-floor-clip`}>
                <path d="M110 290 340 190 570 290 340 390Z" />
              </clipPath>
              <linearGradient
                id={`${idPrefix}-window-light`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop stopColor="var(--construction-sun)" stopOpacity=".46" />
                <stop
                  offset="1"
                  stopColor="var(--construction-sun)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path
              d="M104 300 340 405 576 300 340 195Z"
              fill="var(--construction-shadow)"
            />
            <path
              className="construction-floor"
              d="M110 290 340 190 570 290 340 390Z"
            />
            <g className="construction-plan">
              <path
                d="M110 290 340 190 570 290 340 390Z"
                fill={`url(#${idPrefix}-plan-grid)`}
              />
              <path
                d="M110 290V140L340 40 570 140V290M340 40V190"
                fill="none"
                stroke="var(--construction-line)"
                strokeWidth="1.4"
              />
              <path
                d="M95 312 329 414M92 304 98 320M325 406 332 422M352 414 585 312M349 406 356 422M580 306 588 319"
                fill="none"
                stroke="var(--construction-copper)"
                strokeWidth="1"
              />
            </g>
            <g className="construction-layer construction-walls" data-layer="1">
              <path
                className="construction-wall-left"
                d="M110 140 340 40V190L110 290Z"
              />
              <path
                className="construction-wall-right"
                d="M340 40 570 140V290L340 190Z"
              />
              <path
                d="M110 140 340 40 570 140M340 40V190"
                fill="none"
                stroke="var(--construction-wall-edge)"
                strokeWidth="1.5"
              />
            </g>
            <g className="construction-infrastructure">
              <path
                className="construction-circuit"
                d="M148 257V166L308 96V180M226 222V161L308 125M367 201V91L538 166V270M474 242V167L538 195"
                fill="none"
                stroke="var(--construction-copper)"
                strokeWidth="2.8"
              />
              <g fill="var(--construction-copper)">
                <circle cx="148" cy="257" r="4" />
                <circle cx="226" cy="222" r="4" />
                <circle cx="308" cy="180" r="4" />
                <circle cx="367" cy="201" r="4" />
                <circle cx="474" cy="242" r="4" />
                <circle cx="538" cy="270" r="4" />
              </g>
              <path
                d="M150 286 340 203 526 286 340 369 194 305 340 241 442 286 340 332 268 301"
                fill="none"
                stroke="var(--construction-pipe)"
                strokeWidth="2"
              />
            </g>
            <g
              className="construction-layer construction-finish"
              data-layer="2"
            >
              <g
                clipPath={`url(#${idPrefix}-floor-clip)`}
                stroke="var(--construction-grain)"
                strokeWidth="1"
                opacity=".45"
              >
                <path d="M80 310 370 184M105 321 395 195M130 332 420 206M155 343 445 217M180 354 470 228M205 365 495 239M230 376 520 250M255 387 545 261M280 398 570 272M305 409 595 283" />
              </g>
              <path
                d="M140 151 276 92V207L140 267Z"
                fill="var(--construction-window-frame)"
              />
              <path
                d="M147 156 269 103V202L147 255Z"
                fill="var(--construction-window)"
              />
              <path
                d="M208 129V229M147 205 269 152"
                stroke="var(--construction-window-frame)"
                strokeWidth="4"
              />
              <path
                d="M151 275 263 226 459 307 346 357Z"
                fill={`url(#${idPrefix}-window-light)`}
              />
              <path
                d="M352 176 559 266M119 275 135 268M281 205 330 184"
                fill="none"
                stroke="var(--construction-baseboard)"
                strokeWidth="3"
              />
              <path
                d="M364 69 543 147"
                fill="none"
                stroke="var(--construction-sun)"
                strokeWidth="3"
              />
            </g>
            <g
              className="construction-layer construction-furniture"
              data-layer="3"
            >
              <path
                d="M214 300 348 242 481 300 347 360Z"
                fill="var(--construction-rug)"
              />
              <path
                d="M224 300 348 247 471 300 347 354Z"
                fill="none"
                stroke="var(--construction-rug-edge)"
                strokeWidth="1"
              />
              <g className="construction-sofa">
                <path
                  d="M374 196 521 260 488 274 341 210Z"
                  fill="var(--construction-sofa-top)"
                />
                <path
                  d="M374 154 521 218V260L374 196Z"
                  fill="var(--construction-sofa-back)"
                />
                <path
                  d="M341 210 488 274V300L341 236Z"
                  fill="var(--construction-sofa-front)"
                />
                <path
                  d="M488 274 521 260V286L488 300Z"
                  fill="var(--construction-sofa-back)"
                />
                <path
                  d="M338 193 354 186 354 231 338 238Z"
                  fill="var(--construction-sofa-back)"
                />
                <path
                  d="M338 193 354 186 392 203 376 210Z"
                  fill="var(--construction-sofa-top)"
                />
                <path
                  d="M338 193 376 210V242L338 226Z"
                  fill="var(--construction-sofa-front)"
                />
                <path
                  d="M473 252 489 245 527 262 511 269Z"
                  fill="var(--construction-sofa-top)"
                />
                <path
                  d="M473 252 511 269V297L473 280Z"
                  fill="var(--construction-sofa-front)"
                />
                <path
                  d="M411 212 445 227M423 218 402 228M458 235 437 244"
                  fill="none"
                  stroke="var(--construction-sofa-seam)"
                  strokeWidth="1.2"
                />
              </g>
              <ellipse
                cx="322"
                cy="309"
                rx="51"
                ry="22"
                fill="var(--construction-shadow)"
              />
              <path
                d="M294 295V319M349 295V319"
                stroke="var(--construction-table-leg)"
                strokeWidth="4"
              />
              <ellipse
                cx="322"
                cy="292"
                rx="48"
                ry="21"
                fill="var(--construction-table-edge)"
              />
              <ellipse
                cx="322"
                cy="288"
                rx="48"
                ry="21"
                fill="var(--construction-table)"
              />
              <path
                d="M310 282 327 274 344 282 327 290Z"
                fill="var(--construction-book)"
              />
              <ellipse
                cx="302"
                cy="286"
                rx="7"
                ry="3"
                fill="var(--construction-pot)"
              />
              <path
                d="M296 282 298 288Q302 291 306 288L308 282Z"
                fill="var(--construction-pot)"
              />
              <ellipse
                cx="182"
                cy="281"
                rx="18"
                ry="8"
                fill="var(--construction-shadow)"
              />
              <path
                d="M167 256 171 278Q182 288 193 278L197 256Z"
                fill="var(--construction-pot)"
              />
              <ellipse
                cx="182"
                cy="256"
                rx="15"
                ry="6"
                fill="var(--construction-pot-edge)"
              />
              <path
                d="M182 256V204M182 238 167 217M182 226 197 208"
                fill="none"
                stroke="var(--construction-leaf-dark)"
                strokeWidth="2"
              />
              <path
                d="M181 224Q153 226 156 202Q177 200 181 224M183 211Q173 184 187 178Q204 199 183 211M184 230Q205 232 210 207Q189 210 184 230"
                fill="var(--construction-leaf)"
              />
              <path
                d="M416 105 480 133V173L416 145Z"
                fill="var(--construction-picture-frame)"
              />
              <path
                d="M421 114 475 137V164L421 141Z"
                fill="var(--construction-picture)"
              />
              <path
                d="M424 139 441 122 457 150 470 145"
                fill="none"
                stroke="var(--construction-copper)"
                strokeWidth="2"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
