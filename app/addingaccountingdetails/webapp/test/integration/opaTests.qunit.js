sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/satinfotech/cloudapps/addingaccountingdetails/test/integration/FirstJourney',
		'com/satinfotech/cloudapps/addingaccountingdetails/test/integration/pages/AccountingList',
		'com/satinfotech/cloudapps/addingaccountingdetails/test/integration/pages/AccountingObjectPage'
    ],
    function(JourneyRunner, opaJourney, AccountingList, AccountingObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/satinfotech/cloudapps/addingaccountingdetails') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAccountingList: AccountingList,
					onTheAccountingObjectPage: AccountingObjectPage
                }
            },
            opaJourney.run
        );
    }
);