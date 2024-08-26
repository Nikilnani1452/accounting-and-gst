sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/satinfotech/cloudapps/gst/test/integration/FirstJourney',
		'com/satinfotech/cloudapps/gst/test/integration/pages/AccountingList',
		'com/satinfotech/cloudapps/gst/test/integration/pages/AccountingObjectPage',
		'com/satinfotech/cloudapps/gst/test/integration/pages/ItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, AccountingList, AccountingObjectPage, ItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/satinfotech/cloudapps/gst') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAccountingList: AccountingList,
					onTheAccountingObjectPage: AccountingObjectPage,
					onTheItemsObjectPage: ItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);