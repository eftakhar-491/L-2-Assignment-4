const faqs = [
  {
    q: "How do I borrow a book?",
    a: "Just click on a book and follow the instructions to borrow it.",
  },
  {
    q: "Can I return a book anytime?",
    a: "Yes, you can return it at your convenience.",
  },
  {
    q: "Is there a late fee?",
    a: "Nope! No hidden charges or late fees.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-neutral-900 text-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">📚 FAQs</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            <p className="text-gray-300 mt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
