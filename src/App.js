import moon from "./assets/img/moonlight.svg";
import "./assets/css/App.css";
import { Link } from "react-router-dom";
import { CupHot } from "react-bootstrap-icons";

export default function App() {
  return (
    <>
      <section className="py-4 px-4 px-sm-1 cdin">
        <div className="container ">
          <div className="d-sm-flex align-items-center justify-content-between mainc">
            <div className="img-home">
              <h1 className="heading">
                VIS<span></span>
                <span className="text-secondary">TOFY</span>
              </h1>
              <p className="lead my-4">
                VISTOFY: The coolest academic notes-sharing platform around!
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={moon}
              alt="in office"
            />
          </div>
        </div>
      </section>
      <div className="mt-3 px-3 px-sm-5">
        <div className="container">
          <p>
            VISTOFY is the coolest academic notes-sharing platform around, built
            by a bunch of tech-savvy students at TRIDENT Institute, and
            it&apos;s totally free ❤️. You don&apos;t have to sell your soul to
            afford{" "}
            <Link to="/notes" className="fw text-var">
              good quality notes
            </Link>{" "}
            anymore. <br />
          </p>
          <p>
            We have a nifty{" "}
            <Link to="/taskboard" className="text-var">
              task section
            </Link>{" "}
            for you to manage your work. No more forgetting deadlines and
            drowning in assignments. Pop over to the{" "}
            <Link to="/community" className="text-var">
              community chat page
            </Link>{" "}
            and give us a holler. We&apos;re always happy to help out and
            connect with like-minded folks. We&apos;re looking for active
            contributions and you&apos;re always welcome to{" "}
            <Link to="/contributions" className="text-var">
              contribute
            </Link>{" "}
            to VISTOFY :)
          </p>
          <p>
            Oh, and if you really dig what we&apos;re doing here at VISTOFY,
            we&apos;d be over the moon if you&apos;d consider sponsoring us.
            Trust us, it really helps keep the site running and lets us add all
            sorts of fun new features!
          </p>
          <div>
            <a
              href="https://github.com/sponsors/fuzzymfx"
              className="text-var"
              target="_blank"
              rel="noreferrer"
            >
              <CupHot
                size={30}
                style={{
                  marginRight: "10px",
                  color: "#FF5E5B",
                }}
              />
              Buy us a coffee!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
