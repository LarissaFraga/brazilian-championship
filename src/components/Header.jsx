export default function Header({ titleText = 'header-text' }) {
  return (
    <header>
      <div className="bg-gray-300 mx-auto p-4">
        <h1 className="text-center font-semibold text-xl">{titleText}</h1>
      </div>
    </header>
  );
}
