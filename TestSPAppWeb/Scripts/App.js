var taxPickerIndex = {};
var context;
var termSetId = "9ac29b85-9e35-4198-b943-40f224b5d1da";
var termFrom, termTo;
$(document).ready(function () {
    //Get the URI decoded SharePoint site url from the SPHostUrl parameter.
    var spHostUrl = decodeURIComponent(getQueryStringParameter('SPHostUrl'));
    var appWebUrl = decodeURIComponent(getQueryStringParameter('SPAppWebUrl'));
    var spLanguage = decodeURIComponent(getQueryStringParameter('SPLanguage'));

    //Build absolute path to the layouts root with the spHostUrl
    var layoutsRoot = spHostUrl + '/_layouts/15/';

    //load all appropriate scripts for the page to function
    $.getScript(layoutsRoot + 'SP.Runtime.js',
        function () {
            $.getScript(layoutsRoot + 'SP.js',
                function () {
                    //Load the SP.UI.Controls.js file to render the App Chrome
                    //$.getScript(layoutsRoot + 'SP.UI.Controls.js', renderSPChrome);

                    //load scripts for cross site calls (needed to use the people picker control in an IFrame)
                    $.getScript(layoutsRoot + 'SP.RequestExecutor.js', function () {
                        context = new SP.ClientContext(appWebUrl);
                        var factory = new SP.ProxyWebRequestExecutorFactory(appWebUrl);
                        context.set_webRequestExecutorFactory(factory);
                    });

                    //load scripts for calling taxonomy APIs
                    $.getScript(layoutsRoot + 'init.js',
                        function () {
                            $.getScript(layoutsRoot + 'sp.taxonomy.js',
                                function () {
                                    //termset used for dependant selection


                                    //bind the taxonomy picker to the default keywords termset
                                    // $('#taxPickerKeywords').taxpicker({ isMulti: true, allowFillIn: true, useKeywords: true }, context);
                                    //$('#taxPickerKeywordsContainsSuggestions').taxpicker({ isMulti: true, allowFillIn: true, useKeywords: true, useContainsSuggestions: true }, context);
                                    //bind taxpickers that depend on eachothers choices
                                    $('#taxPickerCars').taxpicker({ isMulti: false, allowFillIn: false, useKeywords: false, termSetId: termSetId, levelToShowTerms: 2, termSetImageUrl: layoutsRoot + "/Images/" }, context, function () {

                                        $('#lblTermID').html(this._selectedTerms[0].Id);
                                        termFrom = this._selectedTerms[0];
                                    });
                                    $('#taxPickerTermTo').taxpicker({ isMulti: false, allowFillIn: false, useKeywords: false, termSetId: termSetId, levelToShowTerms: 1, termSetImageUrl: layoutsRoot + "/Images/" }, context, function () {
                                        termTo = this._selectedTerms[0];
                                    });




                                    taxPickerIndex["#taxPickerCars"] = 0;
                                    taxPickerIndex["#taxPickerTermTo"] = 4;
                                });
                        });
                });
        });


});
function addTermTo() {
    var taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
    var termStore = taxSession.getDefaultSiteCollectionTermStore();
    var termSet;
    //if (termSetId != null)
    termSet = termStore.getTermSet(termSetId); //get termset by id

    var parentTerm = termSet.getTerm(termTo.Id); //get term by Id

    //create new child term under the parent term
    var sourceTerm = termSet.getTerm(termFrom.Id);
    var sourceTermJQ = JSON.parse($('#taxPickerCars').val());
    //create new child term under the parent term
    var newTerm = parentTerm.createTerm(sourceTermJQ[0].Name, 1033, newGuid());

    context.load(newTerm);
    var newTermchilds;
    if ($('input[name="chkChilds"]:checked').length > 0) {
        var terms = sourceTerm.get_terms();  //load child Terms
        context.load(terms);
    }
    context.executeQueryAsync(
        function () {
            alert('Copy term has been created');
            if ($('input[name="chkChilds"]:checked').length > 0) {
                var terms = sourceTerm.get_terms();  //load child Terms
                //context.load(terms);
                for (var i = 0; i < terms.get_count() ; i++) {
                    var term = terms.getItemAtIndex(i);
                    newTermchilds = newTerm.createTerm(term.get_name(), 1033, newGuid());
                    context.load(newTermchilds);
                }
                context.executeQueryAsync(function () {
                    alert('Copy term childs has been created');
                }, function (sender, args) {
                    alert(args.get_message());
                });
            }


        },
        function (sender, args) {
            alert(args.get_message());
        });


}

//function to get a parameter value by a specific key
function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split('?')[1].split('&');
    var strParams = '';
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return singleParam[1];
    }
}
//creates a new guid
function newGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result
}