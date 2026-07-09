const ErrorPage = ({ error }: { error: Error | null }) => {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-4xl">{error?.message}</h1>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
