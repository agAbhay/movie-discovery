import Image from "next/image";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  };
}

export default function Home() {

  return null;
}
