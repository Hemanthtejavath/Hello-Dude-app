const NoFriends = () => {
  return (
    <div className="flex items-center justify-center w-full  px-4">
      <div className="relative w-full max-w-lg rounded-3xl p-[2px] bg-gradient-to-r from-primary via-secondary to-accent">
        {/* Glass Card */}
        <div className="bg-base-100 rounded-3xl p-10 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 mb-6">
            <span className="text-4xl">🤝</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-3">No Friends Yet</h2>
        </div>
      </div>
    </div>
  );
};

export default NoFriends;
