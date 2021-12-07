export const historyOptions = {
  scales: {
    xAxes: [
      {
        display: true,
        type: "time",
        time: {
          parser: "MM/DD/YYYY HH:mm",
          tooltipFormat: "ll HH:mm",
          unit: "day",
          unitStepSize: 1,
          displayFormats: {
            day: "MM/DD/YYYY",
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
