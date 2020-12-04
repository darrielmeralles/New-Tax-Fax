let taxFaxCountry = "au";

let getTaxFax = doAjax({
    url:`actions.php`,
    type: 'POST',
    data:JSON.stringify({
        'action':'Get Tax Fax',
        'country': taxFaxCountry //au or nz
    })
});

getTaxFax.then(data=>{
    let resp = JSON.parse(data);
    if(resp.status){
        let taxFax = resp.response.data;
        let pushItem = [];
        taxFax.map(function(i){
            let title =  i.title;
            let description =  i.description;
            pushItem.push({
               'title': title,
               'description': description
           });
        });
        appenditem(pushItem);
    }else{
        console.log(resp);
    }
});

function appenditem(pushItem) {
    pushItem.map(function(data) {

        //GETTING TITLE AND CONVERT TO A PERMALINK
        let titleLink = data.title;
        let dataDesc = data.description;

        taxFaxCountry.includes("au") ? getIconAu(titleLink) : getIconNz(titleLink);

        let appendData=`<div class="taxMaincon taxFaxCon" data-title="${data.title}">
                            <div class="hiddenDesc">${dataDesc}</div>
                            <div class="taxFaxWrap">
                                <span class="taxfaxIcon"><i class="${listIcon}"></i></span>
                                <span class="taxTitle">${data.title}</span>
                             </div>
                        </div>`;

        let tfListView=`<div class="taxMaincon listView" data-title="${data.title}">
                            <div class="hiddenDesc">${dataDesc}</div>
                            <div class="taxFaxWraplist">
                                <span class="taxTitle">${data.title}</span>
                            </div>
                        </div>`; 

        $('.mainWrapperTaxfax').append(appendData);
        $('.tfListViewWrapper .tflistView').append(tfListView);  
    }); //pushItem Map

    //CLICK TO OPEN DESCRIPTION ICON LAYOUT
    $('.taxMaincon').on('click', function(){
        let conTitle =  $(this).attr('data-title');
        let conDesc = $(this).children().first().html();
        let contentTf = `<div>
                            <h3>${conTitle}</h3>
                            <div>${conDesc}</div>    
                        </div>`
        $('.descCons').show();
        $('.listIconMain').hide();
        $('.descCons .desWrap .desAppendCon .contentCon').html(remoV(contentTf));
    });
} // function appenditem

// BUTTON HIDE AND SHOW
$("#taxFaxButton").click(function(){

    let btnTxt = $(".mainWrapperTaxfax").hasClass( "tfHide" );
    let btn = $("#taxFaxButton button");

    if(btnTxt === true){
        $(".tfMainContainer h3").text("Tax Fax");
        btn.text("View Basic Tax Facts layout");
    }else{
        $(".tfMainContainer h3").text("Tax Fax(Basic)")
        btn.text("View Icon Tax Facts layout")
    }
    
    $(".mainWrapperTaxfax").toggleClass("tfHide");
    $(".tfListViewWrapper").toggleClass("tfShow");
   
});

$("#taxFaxButton2").click(function(){
    $(".descCons").hide();
    $('.listIconMain').show();
});

//REMOVE /N IN DESCRIPTION
function remoV(str){
    return str.trim();
}

//AU ICONS
function getIconAu(data){
    switch(data) {
        case "Activity Statement":
            listIcon = "fas fa-file-alt";
        break;
        case "Australian Business Number":
            listIcon = "fas fa-hashtag";
        break;
        case "Capital Allowances":
            listIcon = "fas fa-chart-bar";
        break;
        case "Capital Gains Tax":
            listIcon = "fas fa-chart-line";
        break;
        case "Excise":
            listIcon = "fas fa-tag";
        break;
        case "First Home Super Saver":
            listIcon = "fas fa-home";
        break;
        case "Fringe Benefits Tax":
            listIcon = "fas fa-dollar-sign";
        break;
        case "Fuel Schemes":
            listIcon = "fas fa-gas-pump";
        break;
        case "Goods and Services Tax":
            listIcon = "fas fa-hand-holding-usd";
        break;
        case "Imputation":
            listIcon = "fas fa-comments-dollar";
        break;
        case "Income Tax":
            listIcon = "fas fa-search-dollar";
        break;
        case "Loans to Shareholders":
            listIcon = "fas fa-users";
        break;
        case "Medicare Levy":
            listIcon = "fas fa-medkit";
        break;
        case "Paid Parental Leave":
            listIcon = "fas fa-child";
        break;
        case "PAYG Instalments":
            listIcon = "fas fa-business-time";
        break;
        case "PAYG Withholding":
            listIcon = "fab fa-creative-commons-nc";
        break;
        case "Rates and Calculators":
            listIcon = "fas fa-calculator";
        break;
        case "Rental Properties":
            listIcon = "fas fa-key";
        break;
        case "Reportable Tax Payments":
            listIcon = "fas fa-edit";
        break;
        case "Small Business Entity Concessions":
            listIcon = "fas fa-user-tie";
        break;
        case "State Taxes":
            listIcon = "fas fa-file-invoice-dollar";
        break;
        case "Superannuation Contributions for High Income Earners":
            listIcon = "fas fa-donate";
        break;
        case "Superannuation Guarantee":
            listIcon = "fas fa-umbrella";
        break;
        case "Tax Payer Penalties":
            listIcon = "fas fa-ban";
        break;
        case "Wine Equalisation Tax":
            listIcon = "fas fa-wine-glass";
        break;
    }                             
}

//NZ ICONS
function getIconNz(data){
    switch(data) {
        case "ACC Premiums":
            listIcon = "fas fa-wine-glass";
        break;
        case "Depreciation Allowances":
            listIcon = "fas fa-wine-glass";
        break;
        case "Entertainment":
            listIcon = "fas fa-wine-glass";
        break;
        case "Fringe Benefit Tax":
            listIcon = "fas fa-wine-glass";
        break;
        case "Gifting":
            listIcon = "fas fa-wine-glass";
        break;
        case "Goods and Services Tax":
            listIcon = "fas fa-wine-glass";
        break;
        case "GST and E-Commerce":
            listIcon = "fas fa-wine-glass";
        break;
        case "KiwiSaver":
            listIcon = "fas fa-wine-glass";
        break;
        case "PAYE on Salaries and Wages":
            listIcon = "fas fa-wine-glass";
        break;
        case "Provisional Tax":
            listIcon = "fas fa-wine-glass";
        break;
        case "Resident Withholding Tax (RWT)":
            listIcon = "fas fa-wine-glass";
        break;
        case "Tax Credits for Donations":
            listIcon = "fas fa-wine-glass";
        break;
        case "Taxpayer Penalties":
            listIcon = "fas fa-wine-glass";
        break;
        case "Working for Families Tax Credits":
            listIcon = "fas fa-wine-glass";
        break;

        default:
            listIcon = "fas fa-file-alt";
    }                             
}

/**
 * @param settings
 * Reusable Async AJAX
 * eg: var a = {
        url: ajaxurl,
        type: 'POST',
        data: args
    }
    Callback : a.then(data => {
        console.log(data)
    })
    */
   async function doAjax(settings) {
      
    let result
    try{
        result = await $.ajax(settings);
        return result;
    }catch(error){
        console.log(error)
    }

    console.log(result, 'Result')
}