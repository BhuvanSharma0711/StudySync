"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navigationbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-white">𝒞αмρυѕ✘</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
            <Link color="foreground" href="/">
              <p className="text-white">Home</p> 
            </Link>
          </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      
        <NavbarItem>
          <Link color="foreground" href="#Aboutus">
            <p className="text-white">About us</p> 
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#features">
            <p className="text-white">Features</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            <p className="text-white">Contact us</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link href="/auth/login"><p className="text-white">Login</p></Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/register" variant="flat">
            <p className="text-white">Sign Up</p>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
