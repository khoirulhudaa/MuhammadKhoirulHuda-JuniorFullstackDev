interface UsersErrorStateProps {
  message: string;
}

export default function UsersErrorState({ message }: UsersErrorStateProps) {
  return (
    <div className="p-6 flex flex-col items-center text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-lg">
      {message}
    </div>
  );
}