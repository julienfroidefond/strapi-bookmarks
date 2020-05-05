/**
 * All marathons links
 */
const marathon = [
  {
    id: "mar",
    title: "Marathon",
    children: [
      {
        id: "mar-1",
        title: "Mobility Prod",
        url:
          "http://a01marathon-par.cdweb.biz/mobility/ui/#/group/%2Fmobilite%2Fa01",
      },
      {
        id: "mar-2",
        title: "Mobility PP",
        url:
          "http://a01marathon-par.cdweb.biz/mobility/ui/#/group/%2Fmobilite%2Fa02",
      },
      {
        id: "mar-3",
        title: "Mobility Recette",
        url:
          "http://a01marathon-par.cdweb.biz/mobility/ui/#/group/%2Fmobilite%2Fa03",
      },
      {
        id: "mar-4",
        title: "Mobility Dev",
        url:
          "http://a01marathon-par.cdweb.biz/mobility/ui/#/group/%2Fmobilite%2Fa04",
      },
      {
        id: "mar-5",
        title: "SSR Prod",
        url:
          "http://a02marathon.cdweb.biz/mobility/ui/#/apps/%2Fmobilite%2Fa01%2Freact-ssr",
      },
      {
        id: "mar-6",
        title: "Product sheet Prod",
        url:
          "http://a01marathon-bdx.cdweb.biz/mobility/ui/#/apps/%2Fmobilite%2Fa01%2Fproduct-sheet",
      },
    ],
  },
];

const testing = [
  {
    id: "testing",
    title: "Testing",
    children: [
      {
        id: "testing-1",
        title: "Generate customer",
        url:
          "http://a01jtestm01.cdweb.biz/api/recette/Customer/GetCleanCustomer",
      },
      {
        id: "testing-2",
        title: "Generate datas : Datamanager (product/customer/seller)",
        url:
          "https://confluence.cdiscount.com/pages/viewpage.action?pageId=39261137",
      },
      {
        id: "testing-3",
        title: "Creation de panier de recette de l'order",
        url:
          "https://order.recette-cdiscount.com/_TestCreateBasket.mvc/AddCdsProduct",
      },
    ],
  },
];

const changelogs = [
  {
    id: "changelogs",
    title: "Changelogs",
    children: [
      {
        id: "changelog-1",
        title: "Mobility",
        url: "https://confluence.cdiscount.com/display/MOB/2019",
      },
    ],
  },
];

const mobDevToolsFront = [
  {
    id: "mobDevToolsFront",
    title: "Dev tools Front",
    children: [
      {
        id: "mobDevToolsFront-1",
        title: "Edit this cookie",
        url:
          "https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=fr",
      },
      {
        id: "mobDevToolsFront-2",
        title: "Redux dev tools",
        url:
          "https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=fr",
      },
      {
        id: "mobDevToolsFront-3",
        title: "React dev tools",
        url:
          "https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=fr",
      },
      {
        id: "mobDevToolsFront-4",
        title: "Storybook Portal CDS",
        url: "https://a06app.cdbdx.biz/archi-react/storybook-portal/",
      },
    ],
  },
];

const odin = [
  {
    id: "odin",
    title: "Odin",
    children: [
      {
        id: "odin-1",
        title: "Change CICD level (1 -> 2) : Odin",
        url: "https://confluence.cdiscount.com/x/lwN-BQ",
      },
      {
        id: "odin-2",
        title: "Create an app with Odin",
        url: "https://confluence.cdiscount.com/x/FZz2B",
      },
    ],
  },
];

const kube = [
  {
    id: "kube",
    title: "Kube",
    children: [
      {
        id: "kube-1",
        title: "Prod DC1",
        url: "https://a01kubeds-dc1.cdweb.biz",
      },
      {
        id: "kube-2",
        title: "Prod DC2",
        url: "https://a01kubeds-dc2.cdweb.biz",
      },
      {
        id: "kube-3",
        title: "PP",
        url: "https://a02kubeds.cdweb.biz",
      },
      {
        id: "kube-4",
        title: "RCT",
        url: "https://a04kubeds.cdweb.biz",
      },
      {
        id: "kube-5",
        title: "DEV",
        url: "https://a06kubeds.cdbdx.biz",
      },
    ],
  },
];

export default {
  bookmarks: [
    {
      id: "1",
      title: "Backlog techniques",
      children: [
        {
          id: "1-1",
          title: "Desktop",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=4049&projectKey=PC&view=planning.nodetail&quickFilter=14133&issueLimit=100",
        },
        {
          id: "1-2",
          title: "Mobile",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=4077&projectKey=MOB&quickFilter=14197",
        },
        {
          id: "1-3",
          title: "GRC",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?projectKey=ECG&rapidView=3415",
        },
        {
          id: "1-4",
          title: "CZ",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=3913&projectKey=FTSC",
        },
        {
          id: "1-5",
          title: "Pega",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=4067&projectKey=FPG",
        },
        {
          id: "1-6",
          title: "Fraude",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=4073&view=detail&selectedIssue=FIT-302",
        },
        {
          id: "1-7",
          title: "RT",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=3269&projectKey=XPTR&view=planning.nodetail&issueLimit=100",
        },
      ],
    },
    {
      id: "2",
      title: "Tools",
      children: [
        {
          id: "2-1",
          title: "Communication",
          children: [
            {
              id: "2-1-1",
              title: "Teams",
              children: [
                {
                  id: "2-1-1-1",
                  title: "XP Client - technical",
                  url:
                    "https://teams.microsoft.com/l/team/19%3a4c831c1784aa41dfbb46ada06d06d856%40thread.skype/conversations?groupId=06f97966-daab-41f6-8e83-c369a3edd128&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
                {
                  id: "2-1-1-2",
                  title: "XP Client - React",
                  url:
                    "https://teams.microsoft.com/l/team/19%3a4716fd665a9f4d16bc9fdee249d99f65%40thread.skype/conversations?groupId=2e6b2f35-9cb1-488b-bc70-45a414ed8685&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
                {
                  id: "2-1-1-3",
                  title: "XP Client - Java",
                  url:
                    "https://teams.microsoft.com/l/team/19%3aefbfdb390a7944f8851fc0f7d46dc77a%40thread.skype/conversations?groupId=dd08ed03-3136-42fe-94c1-10deb4f05049&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
                {
                  id: "2-1-1-4",
                  title: "XP Client - .Net/C#",
                  url:
                    "https://teams.microsoft.com/l/team/19%3ae61dcfcec34f44f58cef1083735d0b8f%40thread.skype/conversations?groupId=f7c2a94f-23fa-464d-9f31-28d276bf54f3&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
                {
                  id: "2-1-1-5",
                  title: "XP Client - Talend",
                  url:
                    "https://teams.microsoft.com/l/team/19%3ae61dcfcec34f44f58cef1083735d0b8f%40thread.skype/conversations?groupId=f7c2a94f-23fa-464d-9f31-28d276bf54f3&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
                {
                  id: "2-1-1-6",
                  title: "Mobility",
                  url:
                    "https://teams.microsoft.com/l/team/19%3a1ef1ab71d5904a64b00b5a407b877341%40thread.skype/conversations?groupId=37f50c3a-d9db-4abb-9cc6-29a8763e958a&tenantId=34314e6e-4023-4e4b-a15e-143f63244e2b",
                },
              ],
            },
            {
              id: "2-1-2",
              title: "Webmail",
              url: "https://webmail.cdiscount.com/owa/#path=/mail",
            },
            {
              id: "2-1-3",
              title: "Webcal",
              url:
                "https://webmail.cdiscount.com/owa/#path=/calendar/view/WorkWeek",
            },
          ],
        },
        {
          id: "2-2",
          title: "Time report and intranet",
          children: [
            {
              id: "2-2-1",
              title: "Intranet : cinside",
              url: "https://cinside/",
            },
            {
              id: "2-2-2",
              title: "Swap",
              url:
                "https://performancemanager5.successfactors.eu/sf/home?bplte_company=CDISCOUNTPROD#Shell-home",
            },
            {
              id: "2-2-3",
              title: "eTemptation",
              url:
                "https://cdiscount.cloud-horoquartz.fr/eQuartz/SF_WBH.HQ?roleid=15231/0001",
            },
            {
              id: "2-2-4",
              title: "SciForma",
              url:
                "https://sciforma.cdbdx.biz/sciforma/?ACSREQUESTID=_86852f59-429a-4695-b6e8-2be08d03c477#62494",
            },
          ],
        },
        ...testing,
        ...kube,
        ...marathon,
        ...mobDevToolsFront,
        {
          id: "2-3",
          title: "Referentials",
          children: [
            {
              id: "2-3-1",
              title: "La carto",
              url: "https://lacarto.cdbdx.biz/evolve/sites/cdiscount_ref/",
            },
            {
              id: "2-3-2",
              title: "EDI helper",
              url:
                "http://a01edihel001.cdweb.biz/Talend/TalendView?Environnement=RCT&EnvironnementTalend=ref_DEV&Server=&Projet=P_APPRO&RunCode=&JobArchive=AGE05_998_CreatRecXML",
            },
            {
              id: "2-3-3",
              title: "CTools",
              url: "https://ctools/login.php",
            },
          ],
        },
        {
          id: "2-4",
          title: "cTonPass",
          url: "https://ctonpass.cdiscount.com/",
        },
        {
          id: "2-5",
          title: "CTO (chrome plugin by overlayer)",
          url: "https://confluence.cdiscount.com/display/~eric.thouvenin/CTO",
        },
        {
          id: "2-6",
          title: "BrowserStack",
          url:
            "https://live.browserstack.com/dashboard#os=android&os_version=8.0&device=Samsung+Galaxy+S9+Plus&device_browser=chrome&zoom_to_fit=true&full_screen=true&url=www.google.com&speed=1",
        },
        {
          id: "2-7",
          title: "BRAN : dependencies watch",
          url: "http://a06app.cdbdx.biz/archi-react/bran/repositories",
        },
        {
          id: "2-8",
          title: "Documents charte CDS",
          url:
            "https://officecdiscount.sharepoint.com/sites/dsi-projets/Projets/Forms/AllItems.aspx?csf=1&e=ouBwOz&cid=8adb2066%2D2019%2D4e81%2D807f%2D9f1777cfdfb8&RootFolder=%2Fsites%2Fdsi%2Dprojets%2FProjets%2F0000%20%2D%20Dir%20IT%20Clients%20Internes%2F00%20%2D%20DRC%2FDivers%2FCharte%20CDS&FolderCTID=0x01200011028A346A88B946A411D08A243C591F",
        },
        {
          id: "2-9",
          title: "Startup flow",
          url: "https://cdiscount.startupflow.io/",
        },
      ],
    },
    {
      id: "3",
      title: "Contact",
      children: [
        {
          id: "3-1",
          title: "LT",
          url: "mailto:xp-clients-leader-technique@cdiscount.com ",
        },
        {
          id: "3-2",
          title: "Tous les dev / scrums / CDP IT",
          url: "mailto:xp-clients-technique@cdiscount.com",
        },
        {
          id: "3-3",
          title: "PC",
          url: "mailto:pc-team@cdiscount.com",
        },
        {
          id: "3-4",
          title: "Mobile",
          url: "mailto:mobile-team@cdiscount.com",
        },
        {
          id: "3-5",
          title: "ORDER",
          url: "mailto:ft-order-si@cdiscount.com",
        },
        {
          id: "3-6",
          title: "Selfcare",
          url: "mailto:FT-SELFCARE-Tech@cdiscount.com",
        },
        {
          id: "3-7",
          title: "Chatbot",
          url: "mailto:FT-ChatBot@cdiscount.com",
        },
        {
          id: "3-8",
          title: "GRC",
          url: "mailto:equipe-tech-grc@cdiscount.com",
        },
        {
          id: "3-9",
          title: "PEGA",
          url: "mailto:FT-Pega-Tech@cdiscount.com",
        },
        {
          id: "3-10",
          title: "UGC",
          url: "mailto:perimeter-ugc@cdiscount.com",
        },
        {
          id: "3-11",
          title: "Fraude",
          url: "mailto:perimeter-fraud@cdiscount.com",
        },
      ],
    },
    {
      id: "4",
      title: "Monitoring",
      children: [
        {
          id: "4-1",
          title: "Business view",
          url:
            "https://monithor.cdbdx.biz/d/fTDhNvgWk/business-view?orgId=1&refresh=1m&from=now-1h&to=now",
        },
        {
          id: "kube-qs",
          title: "Kube quick starter",
          children: [
            {
              id: "kube-sq-1",
              title:
                "Monithor : Api avec les details http : verb | path | status",
              url:
                "https://monithor/d/y3tRYRqim/http-application-view?orgId=9&refresh=1m",
            },
            {
              id: "kube-sq-2",
              title: "Monithor : Api sans details http ",
              url:
                "https://monithor/d/y3tRYRqimez/global-http-application-view?orgId=9&refresh=1m",
            },
            {
              id: "kube-sq-3",
              title: "Kibana monithor logs",
              url: "https://logs.monithor.cdbdx.biz/app/kibana",
            },
            {
              id: "kube-sq-4",
              title: "Dynatrace : applications and services",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#newservices;filter=anyFilter;gf=all;gtf=l_72_HOURS",
            },
          ],
        },
        {
          id: "4-2",
          title: "Mobility",
          children: [
            {
              id: "4-2-1",
              title: "Front TV",
              url:
                "https://monithor.cdbdx.biz/d/eseg5QDiWz/front-mobile?orgId=9&refresh=30s",
            },
            {
              id: "4-2-2",
              title: "TTFB : Mobile",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#uemapplications/performanceanalysis;uemapplicationId=APPLICATION-C93CBEDCCCFC6FBB;visiblepart=browser;a=Browser;gf=all;gtf=l_72_HOURS;filtr3ftf=custom1574368326499to1574411526499select1574389926499;metric=F;filtr3filterBrwsType=MOBILE_BROWSER",
            },
            {
              id: "4-2-3",
              title: "Node Js",
              url:
                "https://monithor.cdbdx.biz/d/PTSqcpJWk/nodejs-react-ssr?from=now-3h&orgId=9&to=now",
            },
            {
              id: "4-2-4",
              title: "React SSR",
              url: "https://monithor/d/100000054/react-ssr?orgId=9&refresh=1m",
            },
            {
              id: "4-2-5",
              title: "BFF : XHR traffic",
              url:
                "https://monithor/d/nginx/ingress-controller?orgId=9&refresh=5m&var-platform=a01&var-kubernetes_cluster=a01-dc1&var-controller_class=nginx-ingress-controller-front&var-controller=All&var-ingress=ingress-front-bff-mobile-site-8080-bffmobilesite.cdiscount.com&var-site=All&from=1586523844159&to=1586534644160",
            },
            {
              id: "4-2-6",
              title: "BFF : SSR traffic",
              url:
                "https://monithor/d/nginx/ingress-controller?orgId=9&refresh=5m&var-platform=a01&var-kubernetes_cluster=a01-dc1&var-controller_class=nginx-ingress-controller-back&var-controller=All&var-ingress=ingress-back-bff-mobile-site-8080-app.gslb.cdweb.biz&var-site=All&from=1586523870890&to=1586534670890",
            },
            {
              id: "4-2-7",
              title: "Nexus",
              url: "http://tfsdropserver:8082/#browse/browse:npm-group",
            },
          ],
        },
        {
          id: "4-3",
          title: "Desktop",
          children: [
            {
              id: "4-3-1",
              title: "Fronts R2",
              url:
                "https://monithor.cdbdx.biz/d/JuOltPziw/02-fronts-r2?orgId=1&refresh=1m&from=now-1h&to=now",
            },
            {
              id: "4-3-2",
              title: "Front R2 : CPU and requests 90 days",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#smgd;sci=SERVICE-28729D85BD368D8C;tab=CPU;servicefilter=0%1E10%11SERVICE_METHOD_GROUP-9B7117D0BC04524B;gf=6112504937928253433;gtf=l_90_DAYS;timeframe=custom1581379200000to1581984000000",
            },
          ],
        },
        {
          id: "4-4",
          title: "Order",
          children: [
            {
              id: "4-12-1",
              title: "Order CPU",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#customchartconfig;filtercfg=dfb9dc6a-d5d3-4f15-9801-5fa8c8d66078;tileId=13;gf=6980844360692917924;gtf=l_7_DAYS",
            },
            {
              id: "4-12-2",
              title: "Order appels shipping",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#smgd;sci=SERVICE-028BDA72484F0ABF;tab=RT;servicefilter=0%1E7%11SERVICE-A22E49410984C559%150%150%1F%15SERVICE-028BDA72484F0ABF%151%150%1F10%13SERVICE_METHOD_GROUP-35693B660FF95BED%15;gtf=l_7_DAYS;gf=all;timeframe=custom1581949200000to1581949800000",
            },
            {
              id: "4-12-3",
              title: "Order Cockpit",
              url:
                "http://a01kibana-dt.cdweb.biz:5601/app/kibana#/dashboard/3fec1e40-1466-11ea-affc-154ebc8912cf?_g=h@2d95062&_a=h@4df655d",
            },
          ],
        },
        {
          id: "4-5",
          title: "Perf",
          children: [
            {
              id: "4-5-1",
              title: "TTI Prod",
              url:
                "https://monithor.cdbdx.biz/d/06nv5blik/time-to-interactive-wpt-azure-prod?orgId=1&refresh=5m",
            },
            {
              id: "4-5-2",
              title: "File size",
              url:
                "https://grafana.cdweb.biz/d/SfE2aAbiz/file-sizes?orgId=1&refresh=1h",
            },
            {
              id: "4-5-3",
              title: "Perf budget CART",
              url:
                "https://monithor.cdbdx.biz/d/IPmiJdOWk/budget-ft-cart?orgId=1&refresh=5m",
            },
            {
              id: "4-5-4",
              title: "Perf budget NAV",
              url:
                "https://monithor.cdbdx.biz/d/J08XUSuWz/budget-ft-nav?orgId=1&refresh=5m",
            },
            {
              id: "4-5-5",
              title: "TTFB",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#uemapplications/performanceanalysis;uemapplicationId=APPLICATION-C93CBEDCCCFC6FBB;visiblepart=action;contribution=p50;metric=F;gf=all;gtf=l_72_HOURS;filtr3ftf=custom1574368118335to1574411318335select1574389718335",
            },
            {
              id: "4-5-6",
              title: "CRUX",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#uemapplications/performanceanalysis;uemapplicationId=APPLICATION-C93CBEDCCCFC6FBB;visiblepart=action;contribution=p50;metric=F;gf=all;gtf=l_72_HOURS;filtr3ftf=custom1574368118335to1574411318335select1574389718335",
            },
          ],
        },
        {
          id: "4-6",
          title: "Errors",
          children: [
            {
              id: "4-17-1",
              title: "R2 : DT 6 hours",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#failureanalysis;sci=SERVICE-28729D85BD368D8C;timeframe=last6h;servicefilter=0%1E10%11SERVICE_METHOD_GROUP-9B7117D0BC04524B%103%110;gf=6112504937928253433",
            },
            {
              id: "4-17-2",
              title: "Front phone : DT 6 hours",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#failureanalysis;sci=SERVICE-845827D4A9F38046;timeframe=last6h;servicefilter=0%1E10%11SERVICE_METHOD_GROUP-C6D2F966E2F8CEFE%103%110;gf=-5969774604108993058",
            },
            {
              id: "4-17-3",
              title: "CZ : DT 6 hours",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#failureanalysis;sci=SERVICE-9B9BA59C1B23A37F;timeframe=custom1586392200000to1586413800000;servicefilter=0%1E10%11SERVICE_METHOD_GROUP-247A9C14BE91E322%103%110;gf=-5799223798733942179",
            },
            {
              id: "4-17-4",
              title: "Dashboard DT errors 5xx",
              url:
                "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#dashboard;id=33dbe783-cea1-461c-9ce0-1b85dff4c58e;gtf=l_30_MINUTES;gf=all",
            },
            {
              id: "4-17-5",
              title: "Maintenance page by devices and origin",
              url:
                "https://monithor.cdbdx.biz/d/Unge0MXWk/pages-de-maintenance?from=now-3h&orgId=1&refresh=1m&to=now  ",
            },
            {
              id: "4-17-6",
              title: "Obj T2 : maintenance page by minute (see bottom)",
              url:
                "https://monithor.cdbdx.biz/d/SudXaH9Wz/objectifs-t2-decote-de-porc?orgId=1",
            },
          ],
        },
        {
          id: "4-7",
          title: "K8S and CPU by application",
          url:
            "https://monithor.cdbdx.biz/d/qjEqlHRWk/application-view-from-k8s?orgId=9&refresh=5m&var-platform=a01&var-site=dc1&var-kubernetes_cluster=a01-dc1&var-namespace=cart&var-app=cartcore&var-pods=All",
        },
        {
          id: "4-8",
          title: "JAVA applications (GRC/Mob)",
          url:
            "https://monithor/d/--q4ObJZz/front-mobile-grc-global-curves?orgId=9&refresh=10s",
        },
        {
          id: "4-11",
          title: "INFRA RT",
          url:
            "https://omw613.dynatrace-managed.com/e/fbf7bcdb-1735-451e-99b7-b03c241114e6/#dashboard;id=8b0f83db-40aa-4542-b3ff-e9f7b3ae809e;gtf=l_30_DAYS;gf=6112504937928253433",
        },
        {
          id: "4-12",
          title: "Varnish",
          url:
            "https://grafana.cdweb.biz/d/UzHuWGSZz/varnish-cluster-view?orgId=1&from=now-6h&to=now",
        },
        {
          id: "4-13",
          title: "Bots",
          url:
            "https://monithor/d/XbvLprUZk/repartition-bots?orgId=1&refresh=1m",
        },
        {
          id: "4-14",
          title: "DUST : ps monitoring",
          url:
            "https://a99sql001.cdweb.biz/reporting.php?srv=A01SQL-CATALOG&date=22%2F01%2F2020&top=20",
        },
        {
          id: "4-15",
          title: "Dynatrace PP",
          url:
            "https://eyw243.dynatrace-managed.com/e/568f3796-f854-40cf-b381-1d2b624098cc/#newservices;filter=anyFilter;gf=all;gtf=l_2_HOURS",
        },
      ],
    },
    {
      id: "5",
      title: "Roadmaps",
      children: [
        {
          id: "5-1",
          title: "Tech RT",
          url: "https://confluence.cdiscount.com/x/OTUHBQ",
        },
        {
          id: "5-2",
          title: "Devops XP client backlog",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=587&projectKey=XPDO&view=detail",
        },
        {
          id: "5-3",
          title: "RT XP client backlog",
          url:
            "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=3269&projectKey=XPTR&selectedIssue=XPTR-126",
        },
        {
          id: "5-4",
          title: "Wishlist XP",
          url: "https://confluence.cdiscount.com/x/gqh7B",
        },
        {
          id: "5-5",
          title: "Roadmap IT directions",
          url:
            "https://officecdiscount.sharepoint.com/:p:/r/sites/dsi-pilotage/_layouts/15/Doc.aspx?sourcedoc=%7BC4C986B2-819D-4BAE-973A-A08DA2245C22%7D&file=ROADMAP%20IT%20-%20METIER%2BTRANSVERSES%20-%20deni%C3%A8re%20maj%20270120.pptx&wdLOR=cA70BDFDC-1C13-41AC-9CC3-2DD7C3CD7082&action=edit&mobileredirect=true&cid=259fc3c5-ec12-48c8-ab0a-547a108518b1",
        },
      ],
    },
    {
      id: "6",
      title: "Process",
      children: [
        {
          id: "6-1",
          title: "Testing ticket",
          url: "https://jira.cdiscount.com/projects/QCTEST/summary",
        },
        {
          id: "6-2",
          title: "Demande tir de perf",
          url:
            "https://jira.cdiscount.com/secure/CreateIssue.jspa?pid=15002&issuetype=10200",
        },
        {
          id: "6-3",
          title: "Mots de passe SQL server",
          url: "https://confluence.cdiscount.com/x/1th7B",
        },
        {
          id: "6-4",
          title: "Ajout/modification d'un tag partenaire",
          url: "https://confluence.cdiscount.com/x/Rlg0BQ",
        },
        {
          id: "6-5",
          title: "Creation Team Project / repo GIT",
          url: "https://confluence.cdiscount.com/x/b_80Aw",
        },
        ...odin,
      ],
    },
    {
      id: "7",
      title: "Code repositories",
      children: [
        {
          id: "7-1",
          title: "Mobility Back",
          children: [
            {
              id: "7-1-1",
              title: "Product sheet",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontProductSheet/_git/product-sheet",
            },
            {
              id: "7-1-2",
              title: "Showcase",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontServices/_git/showcase",
            },
            {
              id: "7-1-3",
              title: "Navigation",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontServices/_git/navigation",
            },
            {
              id: "7-1-4",
              title: "Shoppingcart",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontShoppingCart/_git/shopping-cart",
            },
            {
              id: "7-1-5",
              title: "BFF mobile app",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontMobile/_git/bff-mobile-app",
            },
            {
              id: "7-1-6",
              title: "BFF mobile site",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontMobile/_git/bff-mobile-site",
            },
            {
              id: "7-1-7",
              title: "BFF PC site",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Front-PC/_git/bff-pc-site",
            },
            {
              id: "7-1-8",
              title: "Lib Cdiscount Java",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/_git/lib-cdiscount-java",
            },
            {
              id: "7-1-9",
              title: "Front java common config kube",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontNavigation/_git/front-java-common-config_kube",
            },
            {
              id: "7-1-10",
              title: "Offer",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/FrontServices/_git/offer",
            },
          ],
        },
        {
          id: "7-2",
          title: "Front End SMS",
          children: [
            {
              id: "7-2-1",
              title: "Web",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/Web",
            },
            {
              id: "7-2-2",
              title: "sms-product-fragment",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/sms-product-fragment",
            },
            {
              id: "7-2-3",
              title: "sms-header-fragment",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/sms-header-fragment",
            },
            {
              id: "7-2-4",
              title: "sms-footer-fragment",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/sms-footer-fragment",
            },
            {
              id: "7-2-5",
              title: "application-components",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/application-components",
            },
            {
              id: "7-2-6",
              title: "ui",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/ui",
            },
            {
              id: "7-2-7",
              title: "configuration",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/configuration",
            },
          ],
        },
        {
          id: "7-3",
          title: "Native app",
          children: [
            {
              id: "7-3-1",
              title: "native-app",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/native-app",
            },
            {
              id: "7-3-2",
              title: "native-ui",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Mobility/Mobility%20Team/_git/native-ui",
            },
          ],
        },
        {
          id: "7-4",
          title: "Cart Back",
          children: [
            {
              id: "7-4-1",
              title: "Cart api",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Cart/_git/cart-api",
            },
            {
              id: "7-4-2",
              title: "Cart core",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Cart/_git/cartcore",
            },
            {
              id: "7-4-3",
              title: "Cart denormalizer",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Cart/_git/cart-denormalizer",
            },
          ],
        },
        {
          id: "7-5",
          title: "Desktop Back",
          children: [
            {
              id: "7-5-1",
              title: "BFF PC",
              url:
                "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Front-PC/_git/bff-pc-site",
            },
          ],
        },
        {
          id: "7-6",
          title: "Desktop R2",
          url:
            "http://tfs.cdbdx.biz:8080/tfs/DefaultCollection/Cdiscount/_versionControl",
        },
      ],
    },
    {
      id: "8",
      title: "Developer",
      children: [
        {
          id: "8-1",
          title: "Wikis",
          url: "https://confluence.cdiscount.com/x/3YSiAQ",
        },
        {
          id: "8-2",
          title: "Guidelines Xp client",
          url: "https://confluence.cdiscount.com/x/s4HEB",
        },
        {
          id: "8-3",
          title: "Mobility",
          children: [
            {
              id: "8-3-1",
              title: "Swagger BFF SMS",
              url:
                "https://bffmobilesite.recette-cdiscount.com/swagger-ui.html",
            },
            {
              id: "8-3-2",
              title: "Swagger BFF Native APP",
              url: "https://bffmobileapp.cdiscount.com/swagger-ui.html",
            },
            {
              id: "8-3-2",
              title: "Feature Flipping to clean (recent)",
              url:
                "https://jira.cdiscount.com/secure/RapidBoard.jspa?rapidView=3455",
            },
            ...marathon,
            ...kube,
          ],
        },
        {
          id: "8-4",
          title: "Bugs Dashboard",
          url: "http://dashboard/DashboardBug.aspx",
        },
        {
          id: "8-5",
          title: "TNR Dashboard",
          url: "http://testing-portal/Releases/SuiviTnr",
        },
        {
          id: "8-6",
          title: "Kube urls",
          url: "https://confluence.cdiscount.com/x/YZTeB",
        },
        ...odin,
        ...testing,
        ...changelogs,
        ...mobDevToolsFront,
      ],
    },
    {
      id: "9",
      title: "Env / Ops",
      children: [
        {
          id: "9-1",
          title: "Kube urls",
          url: "https://confluence.cdiscount.com/x/YZTeB",
        },
        {
          id: "9-2",
          title: "Docs monitoring",
          url: "https://confluence.cdiscount.com/x/HfkBB",
        },
        ...marathon,
        ...kube,
      ],
    },
    {
      id: "10",
      title: "Transverse : CR",
      children: [
        {
          id: "10-1",
          title: "CR archi / RT",
          url: "https://confluence.cdiscount.com/x/l6b2B",
        },
        {
          id: "10-2",
          title: "CR Thot Gaia Odin / RT",
          url: "https://confluence.cdiscount.com/x/C9LvB",
        },
      ],
    },
    {
      id: "11",
      title: "Nouvel arrivant",
      children: [
        {
          id: "11-1",
          title: "Home confluence direction",
          url: "https://confluence.cdiscount.com/x/AZ3JAg",
        },
        {
          id: "11-2",
          title: "Welcome in board",
          url: "https://confluence.cdiscount.com/x/BKPJAg",
        },
        {
          id: "11-3",
          title: "Guide React",
          url: "https://confluence.cdiscount.com/x/8Ff1Ag",
        },
        {
          id: "11-4",
          title: "How-tos",
          url: "https://confluence.cdiscount.com/x/1D4HBQ",
        },
      ],
    },
    {
      id: "12",
      title: "Scrum dashboards",
      children: [
        {
          id: "12-1",
          title: "Mobile team",
          url:
            "https://jira.cdiscount.com/secure/Dashboard.jspa?selectPageId=24217#",
        },
      ],
    },
    {
      id: "13",
      title: "Projects hotspots",
      children: [
        {
          id: "13-1",
          title: "Ryan",
          url: "https://confluence.cdiscount.com/x/YIimAg",
        },
        {
          id: "13-2",
          title: "Refonte panier",
          url: "https://confluence.cdiscount.com/x/DqyJAg",
        },
        {
          id: "13-4",
          title: "Refonte order",
          url: "https://confluence.cdiscount.com/x/uN-JAg",
        },
        {
          id: "13-5",
          title: "Orchestration rebuild",
          url: "https://confluence.cdiscount.com/x/igM0BQ",
        },
      ],
    },
    {
      id: "99",
      title: "Confluence XP client",
      url: "https://confluence.cdiscount.com/x/AZ3JAg",
    },
  ],
};
