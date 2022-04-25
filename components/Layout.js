
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
import Router from "next/router";
import { useState, useEffect } from 'react';
export default function Layout(props) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (

    <div className="flex flex-col min-h-screen bg-gray-100 font-lora">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {loading ? (
        <>
          <div class="flex justify-center items-center h-full h-screen overflow-auto">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-azul"></div>
          </div>
        </>
      ) : (
        <main className="flex-1 lg:container lg:mx-auto px-2 py-2">
          {props.children}
        </main>
      )}
      <Footer />
    </div>
  )
};