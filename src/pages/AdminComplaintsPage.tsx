import React, { useMemo, useState } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import "./AdminComplaintsPage.css";

const complaintsMock = [
{
id:"1",
code:"KN-000125",
order:"GU-99210",
customer:"Nguyễn Văn A",
worker:"Trần Văn B",
reason:"Thợ đến trễ",
date:"20/05/2024 08:15",
status:"Mới",
description:
"Tôi đặt lịch 8h sáng nhưng 10h thợ mới đến. Làm ảnh hưởng công việc của tôi.",
timeline:[
"20/05 08:15 Khách gửi khiếu nại",
"20/05 08:20 Hệ thống tiếp nhận",
"20/05 09:10 Admin tiếp nhận",
"20/05 09:15 Đã liên hệ thợ"
]
},

{
id:"2",
code:"KN-000124",
order:"GU-99209",
customer:"Lê Thị C",
worker:"Hoàng Văn D",
reason:"Chất lượng dịch vụ kém",
date:"19/05/2024",
status:"Đang xử lý",
description:"Điều hòa sau vệ sinh vẫn không lạnh",
timeline:[]
},

{
id:"3",
code:"KN-000123",
order:"GU-99208",
customer:"Phạm Văn E",
worker:"Nguyễn Văn F",
reason:"Thợ không đến",
date:"19/05/2024",
status:"Chờ phản hồi",
description:"Đợi 2 tiếng không ai đến",
timeline:[]
}

]

export default function AdminComplaintsPage(){

const [selected,setSelected]=useState<any>(null)

const stats = [
{
title:"Khiếu nại mới",
value:8,
sub:"Chờ tiếp nhận",
icon:"🔴"
},

{
title:"Đang xử lý",
value:12,
sub:"Đang xác minh",
icon:"🟡"
},

{
title:"Chờ phản hồi",
value:7,
sub:"Chờ KH hoặc thợ",
icon:"🔵"
},

{
title:"Đã giải quyết",
value:95,
sub:"Trong 30 ngày",
icon:"🟢"
},

{
title:"Đã từ chối",
value:5,
sub:"Trong 30 ngày",
icon:"⚫"
}

]

const statusClass=(status:string)=>{

switch(status){

case "Mới":
return "order-status--red"

case "Đang xử lý":
return "order-status--yellow"

case "Chờ phản hồi":
return "order-status--blue"

case "Đã giải quyết":
return "order-status--green"

default:
return "order-status--gray"

}

}

return(

<div className="acp-layout">

<AdminSidebar activeItem="complaints"/>

<main className="acp-main">

<AdminHeader/>

<div className="acp-header-row">
<h1>Quản lý khiếu nại</h1>
</div>


<section className="orders-stats-row">

{stats.map((item)=>(

<div
className="complaint-stat-card"
key={item.title}
>

<div className="complaint-stat-top">

<div className="complaint-icon">

{item.icon}

</div>

<div>

<div className="stat-title">

{item.title}

</div>

<div className="stat-value">

{item.value}

</div>

<div className="complaint-sub">

{item.sub}

</div>

</div>

</div>

</div>

))}

</section>


<section className="orders-controls">

<div className="filters-row">

<div className="orders-search-wrap">
<input
className="orders-search"
placeholder="Tìm mã KN, đơn hàng..."
/>
</div>

<div className="filter-item">

<label>Trạng thái</label>

<select>
<option>Tất cả</option>
<option>Mới</option>
<option>Đang xử lý</option>
<option>Chờ phản hồi</option>
</select>

</div>

<div className="filter-item">

<label>Lý do</label>

<select>

<option>Tất cả</option>
<option>Thợ đến trễ</option>
<option>Không đến</option>

</select>

</div>

</div>

</section>



<div className="order-table-shell">

<table className="order-table">

<thead>

<tr>

<th>Mã KN</th>
<th>Đơn</th>
<th>Khách</th>
<th>Thợ</th>
<th>Lý do</th>
<th>Ngày gửi</th>
<th>Trạng thái</th>
<th></th>

</tr>

</thead>

<tbody>

{complaintsMock.map(item=>(

<tr
className="complaint-row"
key={item.id}
onClick={()=>setSelected(item)}
>

<td>{item.code}</td>

<td>{item.order}</td>

<td>{item.customer}</td>

<td>{item.worker}</td>

<td>{item.reason}</td>

<td>{item.date}</td>

<td>

<span
className={`order-status ${statusClass(item.status)}`}
>

{item.status}

</span>

</td>

<td>

<button
className="view-btn"
onClick={(e)=>{
e.stopPropagation()
setSelected(item)
}}
>

👁

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>



{selected && (

<div
className="complaint-modal-overlay"
onClick={()=>setSelected(null)}
>

<div
className="complaint-modal"
onClick={(e)=>e.stopPropagation()}
>

<div className="modal-header">

<div>

<h2>

Chi tiết khiếu nại {selected.code}

</h2>

<div
className={`order-status ${statusClass(selected.status)}`}
>

{selected.status}

</div>

</div>

<button
className="close-btn"
onClick={()=>setSelected(null)}
>

✕

</button>

</div>



<div className="modal-grid">


<div className="modal-card">

<h4>Thông tin đơn hàng</h4>

<div className="complaint-grid">

<span>Mã đơn</span>
<span>{selected.order}</span>

<span>Dịch vụ</span>
<span>Vệ sinh máy lạnh</span>

<span>Ngày đặt</span>
<span>19/05/2024</span>

<span>Thanh toán</span>
<span>Ví điện tử</span>

</div>

</div>


<div className="modal-card">

<h4>Khách hàng</h4>

<div className="complaint-grid">

<span>Tên</span>
<span>{selected.customer}</span>

<span>SĐT</span>
<span>0901234567</span>

<span>Email</span>
<span>abc@gmail.com</span>

</div>

</div>



<div className="modal-card">

<h4>Thợ thực hiện</h4>

<div className="complaint-grid">

<span>Tên</span>
<span>{selected.worker}</span>

<span>Đánh giá</span>
<span>⭐4.8 (120)</span>

<span>SĐT</span>
<span>0909999999</span>

</div>

</div>


<div className="modal-card">

<h4>Lý do</h4>

{selected.reason}

</div>


<div className="modal-card wide">

<h4>Mô tả</h4>

<p>{selected.description}</p>

</div>



<div className="modal-card">

<h4>Bằng chứng</h4>

<div className="evidence-list">

<div className="evidence-item">
Ảnh
</div>

<div className="evidence-item">
Map
</div>

<div className="evidence-item">
Chat
</div>

<div className="evidence-item">
+2
</div>

</div>

</div>


<div className="modal-card wide">

<h4>Timeline</h4>

<div className="timeline">

{selected.timeline.map(
(item:any)=>

<div className="timeline-item">

{item}

</div>

)}

</div>

</div>

</div>


<div className="action-grid">

<button className="action-btn primary">
Tiếp nhận
</button>

<button className="action-btn">
Liên hệ thợ
</button>

<button className="action-btn">
Yêu cầu bổ sung
</button>

<button className="action-btn warning">
Cảnh cáo
</button>

<button className="action-btn">
Hoàn tiền
</button>

<button className="action-btn danger">
Khóa tài khoản
</button>

<button className="action-btn">
Đóng khiếu nại
</button>

</div>

</div>

</div>

)}

</main>

</div>

)

}