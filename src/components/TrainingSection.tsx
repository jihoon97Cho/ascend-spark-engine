const trainings = [
  {
    title: "Get Approved For $100k+ In Just A Couple Weeks",
    url: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0b75b23abd7a7d6ef14c.png",
  },
  {
    title: "Biggest Mistakes to Avoid When Trying To Secure Max Business Funding",
    url: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0b72ab4113c3074ed7f2.png",
  },
  {
    title: "The Perfect Credit Profile That Banks Love When Approving $50k Limits",
    url: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0b6ef069a04d460a5aa7.png",
  },
  {
    title: "The Biggest Funding Myths That Hold You Back From Securing 100k+ at 0%",
    url: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0b6927678e66dfe3249f.png",
  },
];

const TrainingSection = () => (
  <section id="free-training" className="py-24 px-4 bg-background">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold italic leading-tight">
          If you want to maximize your chances of getting approved,{" "}
          <span className="gold-text">I'd recommend these videos:</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {trainings.map(({ title, url }, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <h3 className="text-base sm:text-lg font-bold text-center leading-snug min-h-[3rem]">
              {title}
            </h3>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl overflow-hidden border-2 border-[hsl(var(--gold))] hover:scale-[1.02] transition-transform duration-300 shadow-lg"
            >
              <img
                src={url}
                alt={title}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrainingSection;
