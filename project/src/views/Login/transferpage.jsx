import React from "react";
import '../../assets/scss/homepage/transferpage.scss';
import { Pagination, Input, Space } from 'antd';
import { Link } from "react-router-dom";
import { AudioOutlined, ClockCircleOutlined } from '@ant-design/icons';




const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const onSearch = (value) => console.log(value);

export default function transferpage(){
    return (
        // 背景
        <div className = "over">
            {/* 大盒子 */}     
            <div className="over_da">
                {/* 选择店铺 */}
                <div className="da_top">
                    <div className="top_left">选择店铺</div>
                    <div className="top_right">
                        <Link to="/Login">退出当前账号</Link>
                    </div>
                </div>
                {/* 头像 */}
                <div className="da_tou">
                    <div className="tou_xian">
                        <div className="xian_pia">
                            <div className="pia_yuan">
                                <div className="yuan_xian"></div>
                            </div>
                            <div className="pia_zi"></div>
                        </div>
                        <div className="xian_zi">
                            <div className="zi_yi">陈小豪</div>
                            <div className="zi_er">+86 156****9088</div>
                        </div>
                    </div>
                </div>
                {/* 搜索 */}
                <div className="da_sou">
                    <div className="sou_you">
                        <div className="you_yi">
                            <Search
                              placeholder="请输入关键词搜索"
                              enterButton="搜索"
                              size="large"
                              suffix={suffix}
                              onSearch={onSearch}
                            />
                        </div>
                    </div>
                </div>
                {/* 表 */}
                <div className="da_bio">
                    <div className="bio_one">
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* 第二排 */}
                    <div className="bio_one">
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* 第三排 */}
                    <div className="bio_one">
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="one_yi">
                            <Link to="/">
                                <div className="one_yi">
                                    <div className="yi_left"></div>
                                    <div className="yi_right">
                                        <div className="right_shang">
                                            <div className="shang_left">朝阳路分店</div>
                                            <div className="shang_right">
                                                <div className="right_fen">分店</div>
                                            </div>
                                        </div>
                                        <div className="right_xia">
                                            <div className="xia_zi">
                                                <ClockCircleOutlined />
                                                有效期至2222/10/22
                                            </div>
                                        </div>
                                        <div className="xia_end"><b>进入此门店</b> </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* 页码 */}
                <div className="da_ye">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
                {/* 底层 */}
                <div className="da_end">© 2022 衡大志原型工作室</div>
            </div>
        </div>
    )
}