sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
], function (MessageToast, ODataModel) {
    'use strict';

    return {
        accounting: async function (oEvent) {
            MessageToast.show("Fetching data...");
            try {
                // Create an OData Model with the service URL and headers
                const oModel = new ODataModel({
                    serviceUrl: "https://my401292-api.s4hana.cloud.sap/sap/opu/odata/sap/API_OPLACCTGDOCITEMCUBE_SRV/",
                    synchronizationMode: "None",
                    headers: {
                        'Authorization': 'Basic ' + btoa("USER_NNRG:FMesUvVB}JhYD9nVbDfRoVcdEffwmVNJJScMzuzx")
                    },
                    autoExpandSelect: tru
                });

                // Fetch the last sync date using a custom fetch request
                let lastSyncDate;
                const metadataUrl = "https://my401292-api.s4hana.cloud.sap/sap/opu/odata/sap/API_OPLACCTGDOCITEMCUBE_SRV/$metadata";

                console.log('Fetching metadata from:', metadataUrl);

                const response = await fetch(metadataUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa("USER_NNRG:FMesUvVB}JhYD9nVbDfRoVcdEffwmVNJJScMzuzx")
                    }
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
                }

                // Extract data as required from the response
                const metadata = await response.text(); // Assuming metadata text is needed for processing
                console.log("Metadata fetched successfully:", metadata);

                // Process metadata or set the lastSyncDate if needed

                let taxDocQuery = {
                    $filter: "",
                    $skip: 0 // Start with the first set of records
                };

                if (lastSyncDate) {
                    taxDocQuery.$filter = `LastChangeDate gt datetimeoffset'${lastSyncDate}'`;
                }

                const taxDocItems = [];
                let batchNumber = 0;
                const batchSize = 5000; // Adjust the batch size as needed

                // Loop to fetch data in batches
                while (true) {
                    const batchResults = await fetchDataInBatches(oModel, taxDocQuery, batchSize);
                    if (batchResults.length === 0) break;

                    taxDocItems.push(...batchResults);
                    taxDocQuery.$skip += batchSize; // Increment skip to fetch the next batch
                    batchNumber++;
                }

                await insertRecordsInBatches(taxDocItems);

                MessageToast.show('Data fetch and insertion completed successfully.');
            } catch (error) {
                console.error('Error during data fetch:', error);
                MessageToast.show('An error occurred while fetching data.');
            }
        }
    };

    async function fetchDataInBatches(oModel, queryParams, batchSize) {
        return new Promise((resolve, reject) => {
            // Create a ListBinding with pagination using $skip and $filter
            const oListBinding = oModel.bindList("/A_OperationalAcctgDocItemCube", undefined, undefined, undefined, {
                $skip: queryParams.$skip,
                $filter: queryParams.$filter
            });

            oListBinding.requestContexts().then(function (aContexts) {
                const results = aContexts.map(context => context.getObject());
                resolve(results);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    async function insertRecordsInBatches(newRecords, batchSize = 5000) {
        if (newRecords.length === 0) {
            console.log('No new records to insert.');
            return;
        }

        for (let i = 0; i < newRecords.length; i += batchSize) {
            const batch = newRecords.slice(i, i + batchSize);
            console.log(`Processing batch of ${batch.length} records.`);
            // Perform the insertion into your service
            // Example: await cds.run(INSERT.into('YourEntity').entries(batch));
        }
    }
});
