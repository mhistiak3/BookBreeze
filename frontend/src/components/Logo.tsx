import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 bg-primary/20 px-3 py-2 rounded">
      <svg
        version="1.0"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="30px"
        height="30px"
        viewBox="0 0 64 64"
        enableBackground="new 0 0 64 64"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill="#F9EBB2"
            d="M56,62H10c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z"
          />
          <g>
            <path
              fill="#45AAB8"
              d="M6,4v49.537C7.062,52.584,8.461,52,10,52h2V2H8C6.896,2,6,2.896,6,4z"
            />
            <path
              fill="#45AAB8"
              d="M56,2H14v50h42h2v-2V4C58,2.896,57.104,2,56,2z"
            />
          </g>
          <g>
            <path
              fill="#394240"
              d="M60,52V4c0-2.211-1.789-4-4-4H8C5.789,0,4,1.789,4,4v54c0,3.313,2.687,6,6,6h49c0.553,0,1-0.447,1-1 s-0.447-1-1-1h-1v-8C59.104,54,60,53.104,60,52z M6,4c0-1.104,0.896-2,2-2h4v50h-2c-1.539,0-2.938,0.584-4,1.537V4z M56,62H10 c-2.209,0-4-1.791-4-4s1.791-4,4-4h46V62z M56,52H14V2h42c1.104,0,2,0.896,2,2v46v2H56z"
            />
            <path
              fill="#394240"
              d="M43,26H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h20c0.553,0,1-0.447,1-1S43.553,26,43,26z"
            />
            <path
              fill="#394240"
              d="M49,20H23c-0.553,0-1,0.447-1,1s0.447,1,1,1h26c0.553,0,1-0.447,1-1S49.553,20,49,20z"
            />
            <path
              fill="#394240"
              d="M23,16h12c0.553,0,1-0.447,1-1s-0.447-1-1-1H23c-0.553,0-1,0.447-1,1S22.447,16,23,16z"
            />
          </g>
          <path
            opacity="0.2"
            fill="#231F20"
            d="M6,4v49.537C7.062,52.584,8.461,52,10,52h2V2H8C6.896,2,6,2.896,6,4z"
          />
        </g>
      </svg>
      <span className="text-xl sm:text-2xl font-semibold text-primary ">BookBreeze</span>
    </Link>
  );
}
export default Logo