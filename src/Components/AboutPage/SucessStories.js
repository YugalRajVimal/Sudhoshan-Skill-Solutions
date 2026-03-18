const stories = [
    {
      name: "Rahul Singh",
      role: "Software Engineer at TCS",
      story:
        "Thanks to Hirring, I transitioned from a small town graduate to working in a leading IT company.",
    },
    {
      name: "Priya Sharma",
      role: "HR Executive",
      story:
        "The career counseling sessions helped me discover the right path and land my dream job.",
    },
  ];
  
  export function SuccessStories() {
    return (
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
  
          <h2 className="text-3xl font-serif font-bold mb-12">
            Success Stories
          </h2>
  
          <div className="grid md:grid-cols-2 gap-10">
  
            {stories.map((story, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
              >
                <p className="text-gray-600 mb-4">
                  "{story.story}"
                </p>
  
                <h4 className="font-semibold">
                  {story.name}
                </h4>
  
                <p className="text-sm text-gray-500">
                  {story.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }