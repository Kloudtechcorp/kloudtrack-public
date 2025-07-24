import { useRouter } from "next/navigation";

type Props = {
  fallbackHref?: string;
};

export default function GoBackButton({ fallbackHref = "/" }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
    >
      Back
    </button>
  );
}
