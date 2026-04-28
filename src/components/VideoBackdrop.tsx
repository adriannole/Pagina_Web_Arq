import heroPoster from "../../Assets/portadaJipijapa.jpg";

export function VideoBackdrop() {
  return (
    <div className="image-backdrop" aria-hidden="true">
      {/* fetchpriority="high" makes this the highest-priority network request —
          critical for LCP (Largest Contentful Paint) score */}
      <img
        className="image-backdrop__image"
        src={heroPoster}
        alt=""
        loading="eager"
        decoding="sync"
        // @ts-ignore — fetchpriority is a valid HTML attribute, React types lag behind
        fetchpriority="high"
      />
      <div className="video-backdrop__grade" />
      <div className="video-backdrop__beam" />
      <div className="video-backdrop__wash" />
      <div className="video-backdrop__vignette" />
      <div className="video-backdrop__grain" />
    </div>
  );
}
