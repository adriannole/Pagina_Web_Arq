import heroPoster from "../../Assets/portadaJipijapa.jpg";

export function VideoBackdrop() {
  return (
    <div className="image-backdrop" aria-hidden="true">
      <img className="image-backdrop__image" src={heroPoster} alt="" loading="eager" decoding="async" />
      <div className="video-backdrop__grade" />
      <div className="video-backdrop__beam" />
      <div className="video-backdrop__wash" />
      <div className="video-backdrop__vignette" />
      <div className="video-backdrop__grain" />
    </div>
  );
}
