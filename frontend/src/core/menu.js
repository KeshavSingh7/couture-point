import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../Assets/JS/script";
import logo from "../Assets/images/logo2.png";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#BFDBF7" };
  } else {
    return { color: "white" };
  }
};

const Menu = ({ history }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      {/*<div className="bg-custom-shade2 flex justify-between">
          <div>
            <img src={logo} alt="logo"/>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              className="lg:hidden w-6 cursor-pointer"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
          <nav className="navbar navbar-expand-lg navbar-mainbg">
            {/*<button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
              <i className="fas fa-bars "></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                {/*<div className="hori-selector">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
                <li className=" active">
                  {/* <span className="far fa-address-book" />
                  <Link
                    style={currentTab(history, "/")}

                    to="/"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  {/* <i className="fas fa-tachometer-alt"></i>
                  <Link
                    style={currentTab(history, "/cart")}

                    to="/cart"
                  >
                    CART
                  </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li>
                    {/* <i className="far fa-clone"></i>
                    <Link
                      style={currentTab(history, "/user/dashboard")}

                      to="/user/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li>
                    {/* <i className="far fa-calendar-alt"></i>
                    <Link
                      style={currentTab(history, "/admin/dashboard")}

                      to="/admin/dashboard"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}

                {!isAuthenticated() && (
                  <Fragment>
                    <li>
                      {/* <i className="far fa-chart-bar"></i>
                      <Link
                        style={currentTab(history, "/signup")}

                        to="/signup"
                      >
                        SIGN UP
                      </Link>
                    </li>
                    <li>
                      {/* <i className="far fa-copy"></i>
                      <Link
                        style={currentTab(history, "/signin")}

                        to="/signin"
                      >
                        SIGN IN
                      </Link>
                    </li>
                  </Fragment>
                )}

                {isAuthenticated() && (
                  <li>
                    {/* <i className="far fa-copy"></i>{" "}
                    <Link
                      to="/"
                      className=" text-warning"
                      onClick={() => {
                        signout(() => {
                          history.push("/");
                        });
                      }}
                    >
                      signout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>*/}
      <div className="bg-custom-shade3 flex flex-wrap justify-between item-center pr-4 pl-2 py-2 sticky top-0">
        <div className="flex justify-between items-center w-full  lg:w-auto">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="lg:hidden w-6 cursor-pointer text-custom-shade2"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <ul className="ml-auto flex-col flex align-center lg:flex-row font-custom2 font-semibold">
            <li className="active mt-2 lg:mr-4">
              <Link
                style={currentTab(history, "/")}
                to="/"
                className="hover:no-underline"
              >
                <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 lg:mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <p className="ml-2">HOME</p>
                </div>
              </Link>
            </li>
            <li className="mt-2 lg:mr-4">
              <Link
                style={currentTab(history, "/cart")}
                to="/cart"
                className="hover:no-underline"
              >
                <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 lg:mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <p className="ml-2">CART</p>
                </div>
              </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="mt-2 lg:mr-4">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  to="/user/dashboard"
                  className="hover:no-underline"
                >
                  <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                    <svg
                      className="w-4 lg:mx-auto"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M229 40V264C229 286.06 211.882 304 190.833 304H38.1667C17.1178 304 0 286.06 0 264V40C0 17.94 17.1178 0 38.1667 0H190.833C211.882 0 229 17.94 229 40Z" />
                      <path d="M512 248V472C512 494.06 494.882 512 473.833 512H321.167C300.118 512 283 494.06 283 472V248C283 225.94 300.118 208 321.167 208H473.833C494.882 208 512 225.94 512 248Z" />
                      <path d="M229 392.545V475.455C229 494.506 211.882 510 190.833 510H38.1667C17.1178 510 0 494.506 0 475.455V392.545C0 373.494 17.1178 358 38.1667 358H190.833C211.882 358 229 373.494 229 392.545Z" />
                      <path d="M473.833 152H321.167C300.088 152 283 134.986 283 114V38C283 17.0136 300.088 0 321.167 0H473.833C494.912 0 512 17.0136 512 38V114C512 134.986 494.912 152 473.833 152Z" />
                    </svg>
                    <p className="ml-2">DASHBOARD</p>
                  </div>
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="mt-2 lg:mr-4">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                  className="hover:no-underline"
                >
                  <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                    <svg
                      className="w-4 lg:mx-auto"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M229 40V264C229 286.06 211.882 304 190.833 304H38.1667C17.1178 304 0 286.06 0 264V40C0 17.94 17.1178 0 38.1667 0H190.833C211.882 0 229 17.94 229 40Z" />
                      <path d="M512 248V472C512 494.06 494.882 512 473.833 512H321.167C300.118 512 283 494.06 283 472V248C283 225.94 300.118 208 321.167 208H473.833C494.882 208 512 225.94 512 248Z" />
                      <path d="M229 392.545V475.455C229 494.506 211.882 510 190.833 510H38.1667C17.1178 510 0 494.506 0 475.455V392.545C0 373.494 17.1178 358 38.1667 358H190.833C211.882 358 229 373.494 229 392.545Z" />
                      <path d="M473.833 152H321.167C300.088 152 283 134.986 283 114V38C283 17.0136 300.088 0 321.167 0H473.833C494.912 0 512 17.0136 512 38V114C512 134.986 494.912 152 473.833 152Z" />
                    </svg>
                    <p className="ml-2">ADMIN DASHBOARD</p>
                  </div>
                </Link>
              </li>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <li className="mt-2 lg:mr-4">
                  <Link
                    style={currentTab(history, "/signup")}
                    to="/signup"
                    className="hover:no-underline"
                  >
                    <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 lg:mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      <p className="ml-2">SIGN UP</p>
                    </div>
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    style={currentTab(history, "/signin")}
                    to="/signin"
                    className="hover:no-underline"
                  >
                    <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 lg:mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <p className="ml-2">SIGN IN</p>
                    </div>
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className="mt-2">
                <Link
                  to="/"
                  className="hover:no-underline text-white"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  <div className="p-1 flex align-items-center border-b-2 border-transparent hover:border-custom-shade2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 lg:mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <p className="ml-2">SIGN OUT</p>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withRouter(Menu);
