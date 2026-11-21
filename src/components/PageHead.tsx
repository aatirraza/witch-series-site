import { CRUMB_HOME, type PageHead as Head } from "../../data/pages";
import Rich from "./Rich";
import VeilLink from "./VeilLink";

/** The banner at the top of every inner page. */
export default function PageHead({ head }: { head: Head }) {
  return (
    <div className="phead">
      <span className="bgimg" style={{ backgroundImage: `url(${head.bg})` }}></span>
      <div className="wrap">
        <div className="crumb">
          <VeilLink href="/">{CRUMB_HOME}</VeilLink> / {head.crumb}
        </div>
        <h1>
          <Rich value={head.title} />
        </h1>
        <p className="lede">{head.lede}</p>
      </div>
    </div>
  );
}
