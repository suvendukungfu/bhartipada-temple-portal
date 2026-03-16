"use client";

export function TransparentDonorList() {
  // Mock data as the backend isn't connected right now in the UI directly, but we show the structure.
  const donors = [
    { id: 1, name: "A Devotee", amount: 11000, purpose: "Temple Flooring", date: "2024-03-16" },
    { id: 2, name: "Rajesh Sahu", amount: 5100, purpose: "General Donation", date: "2024-03-15" },
    { id: 3, name: "Smita Dash", amount: 2100, purpose: "Temple Lighting", date: "2024-03-15" },
    { id: 4, name: "A Devotee", amount: 1001, purpose: "General Donation", date: "2024-03-14" },
    { id: 5, name: "Manas Kumar", amount: 501, purpose: "Festival Fund", date: "2024-03-14" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-maroon/5 overflow-hidden">
      <div className="bg-sandstone px-6 py-4 border-b border-maroon/10">
        <h3 className="font-serif font-bold text-xl text-maroon">Recent Divine Offerings</h3>
        <p className="text-sm text-foreground/70">A transparent view of our community's generosity</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-saffron/5">
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">Donor</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-maroon/5">
            {donors.map((donor) => (
              <tr key={donor.id} className="hover:bg-sandstone/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{donor.name}</td>
                <td className="px-6 py-4 font-bold text-saffron">₹{donor.amount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-sm text-foreground/80">{donor.purpose}</td>
                <td className="px-6 py-4 text-sm text-foreground/60">{new Date(donor.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-sandstone/50 px-6 py-3 text-center text-sm text-foreground/60">
        May the divine bless all our generous devotees.
      </div>
    </div>
  );
}
