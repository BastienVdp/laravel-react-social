import { useStateContext } from "../../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();

  return (
    <>
      {toast.show && (
        <div className="py-2 px-3 rounded-lg text-green-600 bg-green-300 fixed right-4 bottom-4 z-50 animate-fade-in-down">
          {toast.message}
        </div>
      )}
    </>
  );
}
