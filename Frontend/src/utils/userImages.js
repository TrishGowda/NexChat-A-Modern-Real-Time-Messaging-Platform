import aadhish from "../assets/images/aadhish.jpg";
import gomigha from "../assets/images/gomigha.jpg";
import kavipriya from "../assets/images/kavipriya.jpg";
import lawrance from "../assets/images/lawrance.jpg";
import monisha from "../assets/images/monisha.jpg";
import pheebe from "../assets/images/pheebe.jpg";
import preethi from "../assets/images/preethi.jpg";
import puvitha from "../assets/images/puvitha.jpg";
import samyuktha from "../assets/images/samyuktha.jpg";
import swetha from "../assets/images/swetha-raja.jpg"; // Corrected hyphen '-'

const userImages = {
  Aadhish: aadhish,
  Gomigha: gomigha,
  KaviPriya: kavipriya,
  Lawrance: lawrance,
  Monisha: monisha,
  Pheebe: pheebe,
  Preethi: preethi,
  Puvitha: puvitha,
  Samyuktha: samyuktha,
  Swetha: swetha,
};

export const getUserImage = (name) => {
  return userImages[name];
};