export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col flex-1">
      <div className="flex items-center justify-center flex-row relative overflow-hidden p-3 rounded-xl">
        <div className="flex justify-center flex-col mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-x text-redText"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        </div>
        <p className="mr-1 text-sm font-semibold text-redText">404</p>
        <div className="flex flex-row ml-1 text-sm font-medium text-redText">
          Page Not Found
        </div>
        <div className="bg-redText absolute inset-0 opacity-15"></div>
      </div>
    </div>
  );
}
