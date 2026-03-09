const trainings = [
  {
    title: "Get Approved For $100k+ In Just A Couple Weeks",
    video: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0901d13a2e2d9a82fb83.mp4",
  },
  {
    title: "Biggest Mistakes to Avoid When Trying To Secure Max Business Funding",
    video: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e087bc87c0f5580697d48.mp4",
  },
  {
    title: "The Perfect Credit Profile That Banks Love When Approving $50k Limits",
    video: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0871ab4113b8b74e7f20.mp4",
  },
  {
    title: "The Biggest Funding Myths That Hold You Back From Securing 100k+ at 0%",
    video: "https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/690e0875f069a031240a03a9.mp4",
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
        {trainings.map(({ title, video }, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <h3 className="text-base sm:text-lg font-bold text-center leading-snug min-h-[3rem]">
              {title}
            </h3>
            <div className="w-full rounded-xl overflow-hidden border-2 border-[hsl(var(--gold))] shadow-lg">
              <video
                src={video}
                controls
                preload="metadata"
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrainingSection;
