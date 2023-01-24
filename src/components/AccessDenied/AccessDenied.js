import React from "react";
import { Link } from "react-router-dom";

import "./AccessDenied.scss";
const AccessDenied = () => {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <center>
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">Access Denied</h1>
                  </div>
                  <center>
                    <div className="contant_box_404">
                      <h3 className="h2">Look like you're lost</h3>

                      <p>the page you are looking for not avaible!</p>

                      <Link to="/" className="link_404">
                        Go to Home
                      </Link>
                    </div>
                  </center>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccessDenied;
