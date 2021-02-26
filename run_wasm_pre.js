// Globals
const runButton = document.getElementById("runButton");
const textarea = document.getElementById("container");

runButton.addEventListener("click", function () {
  console.log("Run Wasm: run clicked");

  function setupModule() {
    let hex = localStorage.getItem("a.wasm");
    let wasm;
    if (hex === null) {
      console.log("Run Wasm: running default Hello World Wasm");
      wasm = HexToUint8Array(hello_world_wasm());
    } else {
      console.log("Run Wasm: running a.wasm");
      wasm = HexToUint8Array(hex);
    }
    console.log("Run Wasm: Validation: " + WebAssembly.validate(wasm));
    module = {
      wasmBinary: wasm,
      arguments: [],
      print: (function () {
        var element = document.getElementById("container");
        if (element) element.value = ""; // clear browser cache
        return function (text) {
          if (arguments.length > 1)
            text = Array.prototype.slice.call(arguments).join(" ");
          console.log(text);
          if (element) {
            element.value += text + "\n";
            element.scrollTop = element.scrollHeight; // focus on bottom
          }
        };
      })(),
      printErr: function (text) {
        if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(" ");
        console.error(text);
      },
    };
    return module;
  }

  runWasm(setupModule());
});

function hello_world_wasm() {
  return (
    "0061736d010000000192818080001660037f7f7f017f60017f017f6000017f60017f0060000060027f7f017f60037f7e7f017e60027f7f0060047f7e7e7f0060057f7f7f7f7f017f60067f7c7f7f7f7f017f60027e7f017f60037f7f7f0060047f7f7f7f0060057f7f7f7f7f0060047f7f7f7f017f60077f7f7f7f7f7f7f017f60037e7f7f017f60017c017e60047f7f7e7f017e60027e7e017c60027c7f017c02d1808080000316776173695f736e617073686f745f70726576696577310866645f7772697465000f03656e7615656d736372697074656e5f6d656d6370795f626967000003656e760b73657454656d7052657430000303b3808080003204050201000106000100020005150808140303020401000009100c010d110b0b0e000a0712050103040202020301010113090485808080000170010606058680808000010180028002069380808000037f0141a098c0020b7f0141000b7f0141000b07e3818080000d066d656d6f72790200115f5f7761736d5f63616c6c5f63746f72730003046d61696e0004105f5f6572726e6f5f6c6f636174696f6e00050666666c757368003109737461636b53617665002e0c737461636b526573746f7265002f0a737461636b416c6c6f63003015656d736372697074656e5f737461636b5f696e6974002b19656d736372697074656e5f737461636b5f6765745f66726565002c18656d736372697074656e5f737461636b5f6765745f656e64002d195f5f696e6469726563745f66756e6374696f6e5f7461626c6501000c64796e43616c6c5f6a696a690034098b80808000010041010b0508070925260aafcf808000320400102b0b67010a7f2300210241102103200220036b210420042400410021052004200536020c200420003602082004200136020420042802042106200628020421072004200736020041800821082008200410281a410021094110210a2004200a6a210b200b240020090f0b050041b00f0b1500024020000d0041000f0b10052000360200417f0bd60201077f230041206b220324002003200028021c2204360210200028021421052003200236021c200320013602182003200520046b2201360214200120026a210641022107200341106a21010240024002400240200028023c200341106a41022003410c6a100010060d0003402006200328020c2204460d022004417f4c0d0320012004200128020422084b22054103746a2209200928020020042008410020051b6b22086a3602002001410c410420051b6a2209200928020020086b360200200620046b2106200028023c200141086a200120051b2201200720056b22072003410c6a10001006450d000b0b2006417f470d010b2000200028022c220136021c200020013602142000200120002802306a360210200221040c010b410021042000410036021c200042003703102000200028020041207236020020074102460d00200220012802046b21040b200341206a240020040b040041000b040042000bf20202037f017e02402002450d00200220006a2203417f6a20013a0000200020013a000020024103490d002003417e6a20013a0000200020013a00012003417d6a20013a0000200020013a000220024107490d002003417c6a20013a0000200020013a000320024109490d002000410020006b41037122046a2203200141ff017141818284086c22013602002003200220046b417c7122046a2202417c6a200136020020044109490d002003200136020820032001360204200241786a2001360200200241746a200136020020044119490d002003200136021820032001360214200320013602102003200136020c200241706a20013602002002416c6a2001360200200241686a2001360200200241646a20013602002004200341047141187222056b22024120490d002001ad4281808080107e2106200320056a2101034020012006370318200120063703102001200637030820012006370300200141206a2101200241606a2202411f4b0d000b0b20000b0a00200041506a410a490be70101027f200241004721030240024002402002450d002000410371450d00200141ff01712104034020002d00002004460d02200041016a21002002417f6a220241004721032002450d0120004103710d000b0b2003450d010b024020002d0000200141ff0171460d0020024104490d00200141ff017141818284086c2104034020002802002004732203417f73200341fffdfb776a71418081828478710d01200041046a21002002417c6a220241034b0d000b0b2002450d00200141ff017121030340024020002d00002003470d0020000f0b200041016a21002002417f6a22020d000b0b41000b050041cc0d0ba10201017f41012103024002402000450d00200141ff004d0d0102400240100d2802ac012802000d00200141807f714180bf03460d03100541193602000c010b0240200141ff0f4b0d0020002001413f71418001723a00012000200141067641c001723a000041020f0b0240024020014180b003490d002001418040714180c003470d010b20002001413f71418001723a000220002001410c7641e001723a000020002001410676413f71418001723a000141030f0b024020014180807c6a41ffff3f4b0d0020002001413f71418001723a00032000200141127641f001723a000020002001410676413f71418001723a000220002001410c76413f71418001723a000141040f0b100541193602000b417f21030b20030f0b200020013a000041010b1400024020000d0041000f0b200020014100100e0b8e0102017f017e02402000bd2203423488a741ff0f71220241ff0f460d00024020020d00024002402000440000000000000000620d00410021020c010b200044000000000000f043a2200110102100200128020041406a21020b2001200236020020000f0b200120024182786a360200200342ffffffffffffff87807f834280808080808080f03f84bf21000b20000b5301017e02400240200341c00071450d002001200341406aad862102420021010c010b2003450d00200141c00020036bad8820022003ad220486842102200120048621010b20002001370300200020023703080b5301017e02400240200341c00071450d002002200341406aad882101420021020c010b2003450d00200241c00020036bad8620012003ad220488842101200220048821020b20002001370300200020023703080be80302027f027e230041206b2202240002400240200142ffffffffffffffffff0083220442808080808080c0ff437c200442808080808080c080bc7f7c5a0d002000423c8820014204868421040240200042ffffffffffffffff0f83220042818080808080808008540d002004428180808080808080c0007c21050c020b2004428080808080808080c0007c2105200042808080808080808008854200520d01200520044201837c21050c010b0240200050200442808080808080c0ffff0054200442808080808080c0ffff00511b0d002000423c8820014204868442ffffffffffffff03834280808080808080fcff008421050c010b4280808080808080f8ff002105200442ffffffffffffbfffc300560d00420021052004423088a722034191f700490d00200241106a2000200142ffffffffffff3f8342808080808080c000842204200341ff887f6a10112002200020044181f80020036b101220022903002204423c88200241086a2903004204868421050240200442ffffffffffffffff0f832002290310200241106a41086a29030084420052ad84220442818080808080808008540d00200542017c21050c010b200442808080808080808008854200520d00200542018320057c21050b200241206a240020052001428080808080808080807f8384bf0b02000b02000b0a0041881810144190180b070041881810150b5c01017f200020002d004a2201417f6a2001723a004a024020002802002201410871450d0020002001412072360200417f0f0b200042003702042000200028022c220136021c200020013602142000200120002802306a36021041000b910401037f02402002418004490d0020002001200210011a20000f0b200020026a21030240024020012000734103710d0002400240200241014e0d00200021020c010b024020004103710d00200021020c010b200021020340200220012d00003a0000200141016a2101200241016a220220034f0d0120024103710d000b0b02402003417c71220441c000490d002002200441406a22054b0d0003402002200128020036020020022001280204360204200220012802083602082002200128020c36020c2002200128021036021020022001280214360214200220012802183602182002200128021c36021c2002200128022036022020022001280224360224200220012802283602282002200128022c36022c2002200128023036023020022001280234360234200220012802383602382002200128023c36023c200141c0006a2101200241c0006a220220054d0d000b0b200220044f0d01034020022001280200360200200141046a2101200241046a22022004490d000c020b000b0240200341044f0d00200021020c010b02402003417c6a220420004f0d00200021020c010b200021020340200220012d00003a0000200220012d00013a0001200220012d00023a0002200220012d00033a0003200141046a2101200241046a220220044d0d000b0b0240200220034f0d000340200220012d00003a0000200141016a2101200241016a22022003470d000b0b20000bcc0101037f02400240200228021022030d0041002104200210180d01200228021021030b02402003200228021422056b20014f0d0020022000200120022802241100000f0b0240024020022c004b41004e0d00410021030c010b2001210403400240200422030d00410021030c020b20002003417f6a22046a2d0000410a470d000b200220002003200228022411000022042003490d01200020036a2100200120036b2101200228021421050b20052000200110191a2002200228021420016a360214200320016a21040b20040b880301037f230041d0016b22052400200520023602cc0141002102200541a0016a41004128100a1a200520052802cc013602c8010240024041002001200541c8016a200541d0006a200541a0016a20032004101c41004e0d00417f21010c010b0240200028024c4100480d002000102921020b20002802002106024020002c004a41004a0d0020002006415f713602000b20064120712106024002402000280230450d0020002001200541c8016a200541d0006a200541a0016a20032004101c21010c010b200041d0003602302000200541d0006a3602102000200536021c20002005360214200028022c21072000200536022c20002001200541c8016a200541d0006a200541a0016a20032004101c21012007450d0020004100410020002802241100001a200041003602302000200736022c2000410036021c2000410036021020002802142103200041003602142001417f20031b21010b200020002802002203200672360200417f200120034120711b21012002450d002000102a0b200541d0016a240020010b8b12020f7f017e230041d0006b220724002007200136024c200741376a2108200741386a21094100210a4100210b41002101024003400240200b4100480d000240200141ffffffff07200b6b4c0d001005413d360200417f210b0c010b2001200b6a210b0b200728024c220c210102400240024002400240200c2d0000220d450d000340024002400240200d41ff0171220d0d002001210d0c010b200d4125470d012001210d034020012d00014125470d012007200141026a220e36024c200d41016a210d20012d0002210f200e2101200f4125460d000b0b200d200c6b210102402000450d002000200c2001101d0b20010d07200728024c2c0001100b2101200728024c210d024002402001450d00200d2d00024124470d00200d41036a2101200d2c000141506a21104101210a0c010b200d41016a2101417f21100b2007200136024c410021110240024020012c0000220f41606a220e411f4d0d002001210d0c010b410021112001210d4101200e74220e4189d10471450d0003402007200141016a220d36024c200e201172211120012c0001220f41606a220e41204f0d01200d21014101200e74220e4189d104710d000b0b02400240200f412a470d0002400240200d2c0001100b450d00200728024c220d2d00024124470d00200d2c000141027420046a41c07e6a410a360200200d41036a2101200d2c000141037420036a41807d6a28020021124101210a0c010b200a0d064100210a4100211202402000450d0020022002280200220141046a360200200128020021120b200728024c41016a21010b2007200136024c2012417f4a0d01410020126b211220114180c0007221110c010b200741cc006a101e22124100480d04200728024c21010b417f2113024020012d0000412e470d00024020012d0001412a470d00024020012c0002100b450d00200728024c22012d00034124470d0020012c000241027420046a41c07e6a410a36020020012c000241037420036a41807d6a28020021132007200141046a220136024c0c020b200a0d050240024020000d00410021130c010b20022002280200220141046a360200200128020021130b2007200728024c41026a220136024c0c010b2007200141016a36024c200741cc006a101e2113200728024c21010b4100210d0340200d210e417f211420012c000041bf7f6a41394b0d092007200141016a220f36024c20012c0000210d200f2101200d200e413a6c6a41ef076a2d0000220d417f" +
    "6a4108490d000b024002400240200d4113460d00200d450d0b024020104100480d00200420104102746a200d3602002007200320104103746a2903003703400c020b2000450d09200741c0006a200d20022006101f200728024c210f0c020b417f21142010417f4a0d0a0b410021012000450d080b201141ffff7b712215201120114180c000711b210d410021144190082110200921110240024002400240024002400240024002400240024002400240024002400240200f417f6a2c00002201415f7120012001410f714103461b2001200e1b220141a87f6a0e210415151515151515150e150f060e0e0e1506151515150205031515091501151504000b200921110240200141bf7f6a0e070e150b150e0e0e000b200141d300460d090c130b410021144190082110200729034021160c050b410021010240024002400240024002400240200e41ff01710e0800010203041b05061b0b2007280240200b3602000c1a0b2007280240200b3602000c190b2007280240200bac3703000c180b2007280240200b3b01000c170b2007280240200b3a00000c160b2007280240200b3602000c150b2007280240200bac3703000c140b20134108201341084b1b2113200d410872210d41f80021010b4100211441900821102007290340200920014120711020210c200d410871450d032007290340500d0320014104764190086a2110410221140c030b410021144190082110200729034020091021210c200d410871450d0220132009200c6b220141016a201320014a1b21130c020b024020072903402216427f550d002007420020167d22163703404101211441900821100c010b0240200d41801071450d004101211441910821100c010b419208419008200d41017122141b21100b201620091022210c0b200d41ffff7b71200d2013417f4a1b210d20072903402116024020130d00201650450d00410021132009210c0c0c0b20132009200c6b2016506a2201201320014a1b21130c0b0b4100211420072802402201419a0820011b220c41002013100c2201200c20136a20011b21112015210d2001200c6b201320011b21130c0b0b02402013450d002007280240210e0c020b410021012000412020124100200d10230c020b2007410036020c200720072903403e02082007200741086a360240417f2113200741086a210e0b4100210102400340200e280200220f450d010240200741046a200f100f220f410048220c0d00200f201320016b4b0d00200e41046a210e2013200f20016a22014b0d010c020b0b417f2114200c0d0c0b2000412020122001200d1023024020010d00410021010c010b4100210e2007280240210f0340200f280200220c450d01200741046a200c100f220c200e6a220e20014a0d012000200741046a200c101d200f41046a210f200e2001490d000b0b2000412020122001200d4180c00073102320122001201220014a1b21010c090b200020072b034020122013200d20012005110a0021010c080b200720072903403c0037410121132008210c200921112015210d0c050b2007200141016a220e36024c20012d0001210d200e21010c000b000b200b211420000d05200a450d034101210102400340200420014102746a280200220d450d01200320014103746a200d20022006101f41012114200141016a2201410a470d000c070b000b410121142001410a4f0d050340200420014102746a2802000d0141012114200141016a2201410a460d060c000b000b417f21140c040b200921110b2000412020142011200c6b220f20132013200f481b22116a220e20122012200e481b2201200e200d1023200020102014101d200041302001200e200d41808004731023200041302011200f410010232000200c200f101d200041202001200e200d4180c0007310230c010b0b410021140b200741d0006a240020140b1800024020002d00004120710d00200120022000101a1a0b0b4901037f41002101024020002802002c0000100b450d000340200028020022022c000021032000200241016a36020020032001410a6c6a41506a210120022c0001100b0d000b0b20010bbb02000240200141144b0d000240024002400240024002400240024002400240200141776a0e0a000102030405060708090a0b20022002280200220141046a360200200020012802003602000f0b20022002280200220141046a360200200020013402003703000f0b20022002280200220141046a360200200020013502003703000f0b2002200228020041076a417871220141086a360200200020012903003703000f0b20022002280200220141046a360200200020013201003703000f0b20022002280200220141046a360200200020013301003703000f0b20022002280200220141046a360200200020013000003703000f0b20022002280200220141046a360200200020013100003703000f0b2002200228020041076a417871220141086a360200200020012b03003903000f0b2000200220031107000b0b350002402000500d0003402001417f6a22012000a7410f7141800c6a2d00002002723a0000200042048822004200520d000b0b20010b2e0002402000500d0003402001417f6a22012000a74107714130723a0000200042038822004200520d000b0b20010b880102037f017e0240024020004280808080105a0d00200021050c010b03402001417f6a220120002000420a802205420a7e7da74130723a0000200042ffffffff9f015621022005210020020d000b0b02402005a72202450d0003402001417f6a220120022002410a6e2203410a6c6b4130723a0000200241094b21042003210220040d000b0b20010b7001017f23004180026b220524000240200220034c0d0020044180c004710d002005200141ff0171200220036b220241800220024180024922031b100a1a024020030d00034020002005418002101d200241807e6a220241ff014b0d000b0b200020052002101d0b20054180026a24000b0e0020002001200241044105101b0b8a1803127f027e017c230041b0046b22062400410021072006410036022c02400240200110272218427f550d004101210841900c210920019a2201102721180c010b410121080240200441801071450d0041930c21090c010b41960c210920044101710d00410021084101210741910c21090b0240024020184280808080808080f8ff00834280808080808080f8ff00520d00200041202002200841036a220a200441ffff7b711023200020092008101d200041ab0c41af0c2005412071220b1b41a30c41a70c200b1b20012001621b4103101d200041202002200a20044180c0007310230c010b200641106a210c024002400240024020012006412c6a101022012001a02201440000000000000000610d002006200628022c220b417f6a36022c2005412072220d41e100470d010c030b2005412072220d41e100460d024106200320034100481b210e200628022c210f0c010b2006200b41636a220f36022c4106200320034100481b210e200144000000000000b041a221010b200641306a200641d0026a200f4100481b22102111034002400240200144000000000000f0416320014400000000000000006671450d002001ab210b0c010b4100210b0b2011200b360200201141046a21112001200bb8a1440000000065cdcd41a22201440000000000000000620d000b02400240200f41014e0d00200f21032011210b201021120c010b20102112200f210303402003411d2003411d481b210302402011417c6a220b2012490d002003ad2119420021180340200b200b350200201986201842ffffffff0f837c22182018428094ebdc03802218428094ebdc037e7d3e0200200b417c6a220b20124f0d000b2018a7220b450d002012417c6a2212200b3602000b024003402011220b20124d0d01200b417c6a2211280200450d000b0b2006200628022c20036b220336022c200b2111200341004a0d000b0b02402003417f4a0d00200e41196a41096d41016a2113200d41e60046211403404109410020036b20034177481b210a024002402012200b490d002012201241046a20122802001b21120c010b418094ebdc03200a762115417f200a74417f73211641002103201221110340201120112802002217200a7620036a360200201720167120156c2103201141046a2211200b490d000b2012201241046a20122802001b21122003450d00200b2003360200200b41046a210b0b2006200628022c200a6a220336022c2010201220141b221120134102746a200b200b20116b41027520134a1b210b20034100480d000b0b4100211102402012200b4f0d00201020126b41027541096c2111410a210320122802002217410a490d000340201141016a211120172003410a6c22034f0d000b0b0240200e41002011200d41e600461b6b200e410047200d41e70046716b2203200b20106b41027541096c41776a4e0d0020034180c8006a221741096d2215410274200641306a410472200641d4026a200f4100481b6a4180606a210a410a210302402017201541096c6b221741074a0d0003402003410a6c2103201741016a22174108470d000b0b200a2802002215201520036e221620036c6b211702400240200a41046a2213200b470d002017450d010b44000000000000e03f44000000000000f03f44000000000000f83f201720034101762214461b44000000000000f83f2013200b461b20172014491b211a44010000000000404344000000000000404320164101711b2101024020070d0020092d0000412d470d00201a9a211a20019a21010b200a201520176b22173602002001201aa02001610d00200a201720036a221136020002402011418094ebdc03490d000340200a41003602000240200a417c6a220a20124f0d002012417c6a221241003602000b200a200a28020041016a2211360200201141ff93ebdc034b0d000b0b201020126b41027541096c2111410a210320122802002217410a490d000340201141016a211120172003410a6c22034f0d000b0b200a41046a2203200b200b20034b1b210b0b02400340200b220320124d22170d012003417c6a220b280200450d000b0b02400240200d41e700460d00200441087121160c010b2011417f73417f200e4101200e1b220b20114a2011417b4a71220a1b200b6a210e417f417e200a1b20056a2105200441087122160d004177210b024020170d002003417c6a280200220a450d00410a21174100210b200a410a700d000340200b221541016a210b200a2017410a6c221770450d000b2015417f73210b0b200320106b41027541096c211702402005415f7141c600470d0041002116200e2017200b6a41776a220b4100200b41004a1b220b200e200b481b210e0c010b41002116200e201120176a200b6a41776a220b4100200b41004a1b220b200e200b481b210e0b200e20167222144100472117024002402005415f71221541c600470d0020114100201141004a1b210b0c010b0240200c20112011411f75220b6a200b73ad200c1022220b6b41014a0d000340200b417f6a220b41303a0000200c200b6b4102480d000b0b200b417e6a221320053a0000200b417f6a412d412b20114100481b3a0000200c20136b210b0b2000412020022008200e6a20176a200b6a41016a220a20041023200020092008101d200041302002200a2004418080047310230240024002400240201541c600470d00200641106a4108722115200641106a410972211120102012201220104b1b221721120340201235020020111022210b0240024020122017460d00200b200641106a4d0d010340200b417f6a220b41303a0000200b200641106a4b0d000c020b000b200b2011470d00200641303a00182015210b0b2000200b2011200b6b101d201241046a221220104d0d000b02402014450d00200041b30c4101101d0b201220034f0d01200e4101480d0103400240201235020020111022220b200641106a4d0d000340200b417f6a220b41303a0000200b200641106a4b0d000b0b2000200b200e4109200e4109481b101d200e41776a210b201241046a221220034f0d03200e41094a2117200b210e20170d000c030b000b0240200e4100480d002003201241046a200320124b1b2115200641106a4108722110200641106a41097221032012211103400240201135020020031022220b2003470d00200641303a00182010210b0b0240024020112012460d00200b200641106a4d0d010340200b417f6a220b41303a0000200b200641106a4b0d000c020b000b2000200b4101101d200b41016a210b024020160d00200e4101480d010b200041b30c4101101d0b2000200b2003200b6b2217200e200e20174a1b101d200e20176b210e201141046a221120154f0d01200e417f4a0d000b0b20004130200e41126a41124100102320002013200c20136b101d0c020b200e210b0b20004130200b41096a4109410010230b200041202002200a20044180c0007310230c010b200941096a2009200541207122111b210e02402003410b4b0d00410c20036b220b450d00440000000000002040211a0340201a440000000000003040a2211a200b417f6a220b0d000b0240200e2d0000412d470d00201a20019a201aa1a09a21010c010b2001201aa0201aa121010b0240200628022c220b200b411f75220b6a200b73ad200c1022220b200c470d00200641303a000f2006410f6a210b0b20084102722116200628022c2112200b417e6a22152005410f6a3a0000200b417f6a412d412b20124100481b3a000020044108712117200641106a211203402012210b0240024020019944000000000000e04163450d002001aa21120c010b41808080807821120b200b201241800c6a2d00002011723a000020012012" +
    "b7a1440000000000003040a221010240200b41016a2212200641106a6b4101470d00024020170d00200341004a0d002001440000000000000000610d010b200b412e3a0001200b41026a21120b2001440000000000000000620d000b024002402003450d002012200641106a6b417e6a20034e0d002003200c6a20156b41026a210b0c010b200c200641106a6b20156b20126a210b0b200041202002200b20166a220a200410232000200e2016101d200041302002200a2004418080047310232000200641106a2012200641106a6b2212101d20004130200b2012200c20156b22116a6b410041001023200020152011101d200041202002200a20044180c0007310230b200641b0046a24002002200a200a2002481b0b2a01017f20012001280200410f6a417071220241106a36020020002002290300200229030810133903000b05002000bd0b2b01017f230041106b220224002002200136020c410028028c082000200110242101200241106a240020010b040041010b02000b140041a098c0022402419418410f6a41707124010b0700230023016b0b040023010b040023000b0600200024000b1201027f230020006b4170712201240020010bac0101027f024002402000450d000240200028024c417f4a0d00200010320f0b2000102921012000103221022001450d012000102a20020f0b41002102024041002802c80d450d0041002802c80d103121020b024010162802002200450d000340410021010240200028024c4100480d002000102921010b02402000280214200028021c4d0d002000103220027221020b02402001450d002000102a0b200028023822000d000b0b10170b20020b6b01027f02402000280214200028021c4d0d0020004100410020002802241100001a20002802140d00417f0f0b024020002802042201200028020822024f0d002000200120026bac410120002802281106001a0b2000410036021c200042003703102000420037020441000b0d0020012002200320001106000b2301017e200020012002ad2003ad422086842004103321052005422088a710022005a70b0bbc8780800002004180080bb50448656c6c6f2c202573210a00380600002d2b2020203058307800286e756c6c290000000000000000000000000000000011000a00111111000000000500000000000009000000000b000000000000000011000f0a111111030a07000100090b0b000009060b00000b000611000000111111000000000000000000000000000000000b000000000000000011000a0a111111000a00000200090b00000009000b00000b000000000000000000000000000000000000000000000000000c00000000000000000000000c000000000c00000000090c00000000000c00000c000000000000000000000000000000000000000000000000000e00000000000000000000000d000000040d00000000090e00000000000e00000e000000000000000000000000000000000000000000000000001000000000000000000000000f000000000f00000000091000000000001000001000001200000012121200000000000000000000000000000000000000000000000000120000001212120000000000000900000000000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000a000000000a00000000090b00000000000b00000b000000000000000000000000000000000000000000000000000c00000000000000000000000c000000000c00000000090c00000000000c00000c0000303132333435363738394142434445462d30582b30582030582d30782b307820307800696e6600494e46006e616e004e414e002e000041b80c0bf8020500000000000000000000000100000000000000000000000000000000000000000000000200000003000000c80700000004000000000000000000000100000000000000000000000000000affffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003806000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f00b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  );
}
