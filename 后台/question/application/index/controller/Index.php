<?php
namespace app\index\controller;
use app\admin\model\Sender;
use think\Db;
class Index
{
    public function index()
    {
       
        $result=Db::table("questioncenter")->where("questionType",$_POST["questionType"])->where("questionSort",$_POST["questionSort"])->limit(100)->select();
        if($result!=null) {
            for ($i = 0; $i < count($result); $i++) {
                if($result[$i]['questionF']!="")
                {
                    $a=[
                        'A' => $result[$i]['questionA'],
                        'B' => $result[$i]['questionB'],
                        'C' => $result[$i]['questionC'],
                        'D' => $result[$i]['questionD'],
                        'E' => $result[$i]['questionE'],
                        'F' => $result[$i]['questionF']];

                }
                else
                {
                    if($result[$i]['questionE']!="")
                    {
                        $a=[
                            'A' => $result[$i]['questionA'],
                            'B' => $result[$i]['questionB'],
                            'C' => $result[$i]['questionC'],
                            'D' => $result[$i]['questionD'],
                            'E' => $result[$i]['questionE']];
                    }
                    else
                    {
                        $a=[
                            'A' => $result[$i]['questionA'],
                            'B' => $result[$i]['questionB'],
                            'C' => $result[$i]['questionC'],
                            'D' => $result[$i]['questionD']];
                    }

                }
                $array = Array('question' => $result[$i]['title'],
                    'option' => $a,
                    'true' => $result[$i]['questionT'],
                    'type' => $result[$i]['questionType'],
                    'sort' => $result[$i] ['questionSort'],
                    "id"=>$result[$i]['id']
                );
                $arr[] = $array;
            }
            return json_encode($arr, JSON_UNESCAPED_UNICODE);
        }
        else
            return json_encode('fail');


    }
    public  function  home()
    {
       
        $result=Db::table("question2")->where("questionType",$_POST["questionType"])->where("questionSort",$_POST["questionSort"])->limit(100)->select();
        if($result!=null) {
            for ($i = 0; $i < count($result); $i++) {
                $array = Array('question' => $result[$i]['title'],
                    'option' =>Array(
                        'A' => $result[$i]['trueA'],
                        'B' => $result[$i]['trueB'],
                        'C' => $result[$i]['trueC'],
                        'D' => $result[$i]['trueD'],
                        'E' => $result[$i]['trueE'],
                        'F' => $result[$i]['trueF'],
                        'G' => $result[$i]['trueG']
                    ),
                    'type' => $result[$i]['questionType'],
                    'sort' => $result[$i] ['questionSort'],
                    "id"=>$result[$i]['id']
                );
                $arr[] = $array;
            }
            return json_encode($arr, JSON_UNESCAPED_UNICODE);
        }
        else
            return json_encode('fail');


    }
    public  function  addwrong()
    {

        $r=Db::table("wrong")->where("openid",$_POST['openid'])->where("errorid",$_POST["id"])->where("type",$_POST["type"])->find();
        if($r==NULL)
        {
            $data=[
                "openid"=>$_POST['openid'],
                "errorid"=>$_POST["id"],
                "type"=>$_POST["type"],
                "sort"=>$_POST['sort']

            ];
            Db::name('wrong')->insert($data);
        }
        else
            return json('fail');
    }
    public function wrong()
    {
        $r=Db::table("questioncenter")->where("id",$_POST["id"])->select();
        return  json_encode($r);
    }
    public function getwrong()
    {
        $r = Db::table("wrong")->where("openid",$_POST["openid"])->select();

        for ($i = 0; $i < count($r); $i++)
            if ($r[$i]['sort'] == "单选" || $r[$i]['sort'] == "多选") {
                $result = Db::table('wrong')
                    ->alias('a')
                    ->join('questioncenter', 'a.errorid = questioncenter.id')

                    ->where("openid",$_POST["openid"])
                    ->select();
            } else {
                $result = Db::table('wrong')
                    ->alias('a')
                    ->join('question2', 'a.errorid = questioncenter.id')

                    ->where("openid",$_POST["openid"])
                    ->select();

            }
        return json_encode($result);
    }
    public function  test()
    {

        $flag=Db::table("result")->where("schoolnum",$_POST["schoolnum"])->where("flag",1)->find();
        if($flag!=null)
        {
            $msg="您已经答过题了";
            $message = array('statuCode'=>222,'msg'=>$msg);
            return json_encode($message);
        }
        else {
            $result = Db::table("testcenter")->select();
            if ($result != null) {
                for ($i = 0; $i < count($result); $i++) {
                    if ($result[$i]['questionF'] !=Null) {
                        $a = [
                            'A' => $result[$i]['questionA'],
                            'B' => $result[$i]['questionB'],
                            'C' => $result[$i]['questionC'],
                            'D' => $result[$i]['questionD'],
                            'E' => $result[$i]['questionE'],
                            'F' => $result[$i]['questionF']];

                    } else {
                        if ($result[$i]['questionE'] != Null) {
                            $a = [
                                'A' => $result[$i]['questionA'],
                                'B' => $result[$i]['questionB'],
                                'C' => $result[$i]['questionC'],
                                'D' => $result[$i]['questionD'],
                                'E' => $result[$i]['questionE']];
                        } else {
                            $a = [
                                'A' => $result[$i]['questionA'],
                                'B' => $result[$i]['questionB'],
                                'C' => $result[$i]['questionC'],
                                'D' => $result[$i]['questionD']];
                        }

                    }
                    $array = Array('question' => $result[$i]['title'],
                        'option' => $a,
                        'true' => $result[$i]['questionT'],
                        "id" => $result[$i]['id']
                    );
                    $arr[] = $array;
                }
                return json_encode($arr, JSON_UNESCAPED_UNICODE);
            } else
                return json_encode('fail');
        }
    }
    public  function  addResult()
    {
        $name=Db::table('userinfo')->where('schoolnum',$_POST["schoolnum"])->find();

        $data=[
            "schoolnum"=>$_POST["schoolnum"],
            "openid"=>$_POST["openid"],
            "score"=>$_POST["score"],
            "name"=>$name["name"],
            "datatime"=>date("Y-m-d H:i:s"),
            "flag"=>1

        ];
        Db::table("result")->insert($data);
    }
}
