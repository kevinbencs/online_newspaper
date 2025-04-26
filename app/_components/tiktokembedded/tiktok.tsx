'use client'
import { useEffect } from 'react'

const Tiktok = (props: { url: string }) => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [])

  return (
    <blockquote className="tiktok-embed rounded-lg" cite={props.url} data-video-id={props.url.slice(props.url.indexOf('video') + 6, props.url.length)} data-embed-from="oembed" style={{ maxWidth: '330px', minWidth: '325px', margin: '0', }} >
      <section>
        <a href={props.url} rel='noreferrer' target="_blank">
          Loading tiktok video <span className="loading loading-dots loading-xs"></span>
        </a>
      </section>
    </blockquote>
  )
}

export default Tiktok