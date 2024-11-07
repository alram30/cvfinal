
import Profile from "./components/biodata";
import Hero from "./components/hero";
import HobbiesGallery from "./components/hobi";
import Rating from "./components/contact_form";
import RiwayatPekerjaan from "./components/RiwayatPekerjaan";
import RiwayatPendidikan from "./components/RiwayatPendidikan";
import Skills from "./components/skills";
import "./style.css"





export default function Gallery() {
  return (
    <section>
      <Hero/>
      <Profile/>
      <RiwayatPendidikan/>
      <RiwayatPekerjaan/>
      <Skills/>
      <HobbiesGallery/>
      <Rating/>
      
      
</section>
);
}