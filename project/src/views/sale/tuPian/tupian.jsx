import React,{ useState, useEffect } from 'react'
import { Space, Table, Button,Select ,DatePicker ,Cascader,ConfigProvider,Input ,message, Upload,Modal} from 'antd';
import { UserOutlined ,AudioOutlined,SearchOutlined,UploadOutlined,PlusOutlined } from '@ant-design/icons';
import './index.scss'
import { upLoadApi,addApi } from '../../../http/sale_api/sale';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Tupian=()=>{

    // const props = {
    //   name: 'img',
    //   method:'POST',
    //   action: 'http://localhost:3000/wechat/activity/uploadpreview',
    //   headers: {
    //     Authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    // };
    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [inventory,setInventory]=useState();  //库存
    const [classification,setClassification]=useState();//分类
    const [specifications,setSpecifications]=useState(); //规格
    const [unit,setUnit]=useState();//库存单位
    
    

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange =async ({ fileList: newFileList }) =>(setFileList(newFileList))

    // useEffect(()=>{console.log(fileList);},[fileList])



    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
    const add=()=>{
      const data={
        name,
        price,
        inventory,
        img:fileList[0].response.data,
        classification,
        specifications,
        unit,
      }
      addApi(data).then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
  
      // Taro.request({
      //   url:'http://localhost:3000/wechat/activity/add',
      //   method:'POST',
      //   data,
      //   success:function(res){
      //     console.log(res);
      //     Taro.showToast({
      //       title:'发布成功'
      //     })
  
      //     setTitle('')
      //     setBody('')
      //     setDateSel('')
      //     setCount(0)
      //     setAddress({})
      //     setImg()
      //   },
      //   fail:function(err){
      //     console.log(err);
      //   }
      // }) 
    }
    
    return (
        <div className='content'> 
          
           <div className='body'>
              商品名称：<Input className='group' value={name} onChange={(e)=>setName(e.target.value)} style={{width:'200px'}} size="middle" placeholder="请输入"  />
           </div>
           <div className='body'>
              商品价格：<Input className='group'  value={price} onChange={(e)=>setPrice(e.target.value)}  style={{width:'200px'}} size="middle" placeholder="请输入"  />
           </div>
           <div className='body'>
              商品库存：<Input className='group'  value={inventory} onChange={(e)=>setInventory(e.target.value)}  style={{width:'200px'}} size="middle" placeholder="请输入"  />
           </div>
    
           <div className='body'>
              {/* 附件信息：<Upload {...props}>
                          <Button icon={<UploadOutlined />}>上传附件</Button>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）
                       </Upload>   */}
              <Upload
                action="http://localhost:3060/sale/uploadpreview"
                listType="picture-card"
                fileList={fileList}
                name='img'
                method='POST'
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>   
           </div>

           <div className='body'>
              商品分类：<Input className='group'  value={classification} onChange={(e)=>setClassification(e.target.value)}  style={{width:'200px'}} size="middle" placeholder="请输入" />
           </div>
           <div className='body'>
              商品规格：<Input className='group'  value={specifications} onChange={(e)=>setSpecifications(e.target.value)}  style={{width:'200px'}} size="middle" placeholder="请输入"  />
           </div>
           <div className='body'>
              商品库存单位：<Input className='group'  value={unit} onChange={(e)=>setUnit(e.target.value)}  style={{width:'200px'}} size="middle" placeholder="请输入"   />
           </div>
           <div className='body'>
                  <button onClick={add}>添加</button>
           </div>

        </div>
       

    )
}

export default  Tupian