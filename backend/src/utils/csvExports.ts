import { createObjectCsvWriter } from "csv-writer";

export const exportCSV = async (leads: any[]) => {
  const csvWriter = createObjectCsvWriter({
    path: "leads.csv",
    header: [
      {
        id: "name",
        title: "NAME"
      },
      {
        id: "email",
        title: "EMAIL"
      },
      {
        id: "status",
        title: "STATUS"
      },
      {
        id: "source",
        title: "SOURCE"
      }
    ]
  });

  await csvWriter.writeRecords(leads);
};