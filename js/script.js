//全选与单选按钮注册事件
$(function () {
    var $inputAll = $(".check")                 /*全部按钮*/
    var $checkedALL = $(".check-all.check")     /*全选按钮*/
    var $selected = $("tbody").find(".check")   /*单选按钮*/
    var $tr = $("tbody>tr")

    $inputAll.on("click", function () {
        //全选按钮
        if($(this).attr('class')=="check-all check"){
            var off = $(this).prop("checked")
             $selected.prop('checked',off)
            priceTotal()
        }
        //单选按钮
        var $selectedlen = $("tbody").find(".check:checked").length
        var $selectlen = $selected.length
        if($selectedlen==$selectlen){
            $checkedALL.prop('checked',true)
        }else{
            $checkedALL.prop('checked',false)
        }
    })
    $tr.on("click", function (e) {
        var e = e||event.window;
        var el = e.target;
        var cla = el.className;
        var $input = $(this).find(".count-input");
        var count = parseInt($input.val());
        //单选按钮
        var checkInput = $(el).parent().parent().find(".check-one.check")
        switch (cla){
            case "add":
              count+=1;
              $input.val(count)
                subTotal(el);
                checkInput.prop("checked",true)
                break;
            case "reduce":
                if(count>1){
                    count-=1
                    $input.val(count)
                    subTotal(el);
                }
                break;
            case "delete":
                $(el).parent().parent().remove('tr') /*删除DOM对象*/
                //这里删除是dom对象,jquery对象要更新获取
                $tr = $("tbody>tr")
                $selected = $("tbody").find(".check")
                break;
        }
        priceTotal()
    })
    /*合计*/
    function priceTotal(){
        var $selectedTotal = $("#selectedTotal");
        var $priceTotal = $("#priceTotal");
        var count = 0;
        var price =0;

        $tr.each(function () {
            var $Input = $(this).find(".check").prop("checked")
            if($Input){
                count += parseInt($(this).find(".count-input").val())
                price += parseFloat($(this).find(".subtotal").html())
            }
        })
        $selectedTotal.html(count)
        $priceTotal.html((price).toFixed(2))
    }
    /*小计*/
    function subTotal(el){
        var $subtotal = $(el).parent().siblings(".subtotal");
        var price  = parseFloat($(el).parent().siblings(".price").html())
        var count = parseInt($(el).siblings(".count-input").val())
        var Total = (price*count).toFixed(2)
        $subtotal.html(Total)
    }
})
