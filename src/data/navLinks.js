import {
  faHotel,
  faICursor,
  faPhoneSquareAlt,
  faPlane,
  faPlaneDeparture,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const NavLinks = [
  {
    id: 1,
    name: "Hotels",
    route: "/affordable-hotel-booking",
  },
  {
    id: 2,
    name: "Flights",
    route: "/cheap-flights-booking",
  },
  {
    id: 3,
    name: "Packages",
    route: "/package",
  },
  {
    id: 4,
    name: "Help | Support",
    route: "/faq",
  },
];

export const NavLinksMobile = [
  {
    id: 1,
    name: "Hotels",
    route: "/affordable-hotel-booking",
    icon: faHotel,
  },
  {
    id: 2,
    name: "Flights",
    route: "/cheap-flights-booking",
    icon: faPlane,
  },
  {
    id: 3,
    name: "Packages",
    route: "/package",
    icon: faPlaneDeparture,
  },
];

export const MobileHelpLinks = [
  {
    id: 1,
    name: "Login",
    route: "/auth/login",
    icon: faUser,
  },
  {
    id: 2,
    name: "Help | Support",
    route: "/faq",
    icon: faQuestionCircle,
  },
];
