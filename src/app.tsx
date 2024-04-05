import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onCleanup, createEffect, Suspense } from "solid-js";

import { useAssets } from "solid-js/web";

import { StyleRegistry, css, renderSheets, type StyleData } from "solid-styled";

function GlobalStyles() {
  css`
    @global {
      body {
        font-family: Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
        margin: 0;
      }

      a {
        margin-right: 1rem;
      }

      main {
        text-align: center;
        padding: 0;
        margin-top: 0; /* Add margin-top to create space for the navigation */
        /* margin: 0 auto; */
        background-image: url('/images/article_background.jpg'); /* Background image */
        background-size: cover; /* Cover the entire element */
        background-position: center; /* Center the background image */
        min-height: 100vh; /* Make sure the background covers the entire viewport */
        width: 100%; /* Ensure full width */
        position: absolute; /* Enable positioning */
      }

      nav {
        position: fixed; /* Fixed position */
        top: 0; /* Position at the top */
        left: 50%; /* Align to the center horizontally */
        transform: translateX(-50%); /* Center align horizontally */
        width: 100%; /* Full width */
        background-color: white; /* Add background color */
        padding: 1rem;
        z-index: 1; /* Ensure the navigation is above other content */
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center align horizontally */
        background-color: rgba(138, 43, 226, 0.5);
        backdrop-filter: blur(10px);
      }

      h1 {
        color: #335d92;
        text-transform: uppercase;
        font-size: 4rem;
        font-weight: 100;
        line-height: 1.1;
        margin: 4rem auto;
        max-width: 14rem;
      }

      p {
        max-width: 14rem;
        margin: 2rem auto;
        line-height: 1.35;
      }

      @media (max-width: 600px) {
        nav {
          flex-direction: column; /* Stack links vertically on small screens */
          align-items: center; /* Center align vertically */
        }
      }

      @media (min-width: 600px) {
        a {
          margin: 0 1rem; /* Add horizontal margin to separate links */
        }
      }

      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }

        p {
          max-width: none;
        }
      }
    }
  `;
  return null;
}

export default function App() {
  const sheets: StyleData[] = [];
  useAssets(() => renderSheets(sheets));

  return (
    <Router
      root={props => (
        <MetaProvider>
          <StyleRegistry styles={sheets}>
            <GlobalStyles />
            <nav> {/* Navigation placed outside main */}
              <a href="/">Index</a>
              <a href="/article">Article</a>
              <a href="/about">About Me</a>
            </nav>
            <main>
              <Suspense>{props.children}</Suspense>
            </main>
          </StyleRegistry>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}