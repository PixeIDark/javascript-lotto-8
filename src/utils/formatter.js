export const formatLottoTickets = tickets => {
  return tickets.map(ticket => `[${ticket.getNumbers().join(", ")}]`).join("\n");
};

export const formatCurrency = (num) => {
  return num.toLocaleString("ko-KR");
};