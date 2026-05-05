import React, { useState, useRef } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { FaPencil, FaPlus, FaTrash, FaImage } from 'react-icons/fa6';
import './AdminCategoriesPage.css';

type Category = {
  id: string;
  title: string;
  short: string;
  priority?: 'high' | 'normal' | 'low';
  status?: 'active' | 'inactive';
  iconUrl?: string | null;
};

const initialCategories: Category[] = [
  { id: 'svc-1', title: 'Máy lạnh', short: 'Vệ sinh, bơm gas, sửa chữa board mạch', priority: 'high', status: 'active', iconUrl: null },
  { id: 'svc-2', title: 'Máy giặt', short: 'Xử lý board mạch, không ra nước, rung lắc', priority: 'normal', status: 'active', iconUrl: null },
  { id: 'svc-3', title: 'Tủ lạnh', short: 'Sửa block, nạp gas, hàn ống đồng', priority: 'normal', status: 'inactive', iconUrl: null },
];

const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const openNew = () => { setEditing(null); setIsModalOpen(true); };
  const openEdit = (cat: Category) => { setEditing(cat); setIsModalOpen(true); };

  // modal controlled fields
  const [mTitle, setMTitle] = useState('');
  const [mShort, setMShort] = useState('');
  const [mPriority, setMPriority] = useState<Category['priority']>('normal');
  const [mStatus, setMStatus] = useState<Category['status']>('active');
  
  const [mIconUrl, setMIconUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // when opening modal populate fields
  React.useEffect(() => {
    if (isModalOpen && editing) {
      setMTitle(editing.title);
      setMShort(editing.short);
      setMPriority(editing.priority ?? 'normal');
      setMStatus(editing.status ?? 'active');
      
      setMIconUrl(editing.iconUrl ?? null);
    } else if (isModalOpen && !editing) {
      setMTitle(''); setMShort(''); setMPriority('normal'); setMStatus('active');
      setMIconUrl(null);
    }
  }, [isModalOpen, editing]);

  const handleIconFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMIconUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    const id = editing?.id ?? `svc-${Date.now()}`;
    const payload: Category = { id, title: mTitle || 'Không tên', short: mShort || '', priority: mPriority, status: mStatus, iconUrl: mIconUrl ?? null };

    setCategories((cur) => {
      const i = cur.findIndex(c => c.id === payload.id);
      if (i >= 0) {
        const next = [...cur]; next[i] = payload; return next;
      }
      return [payload, ...cur];
    });
    setIsModalOpen(false);
  };

  const remove = (id: string) => {
    setCategories((cur) => cur.filter(c => c.id !== id));
  };

  return (
    <div className="acp-layout">
      <AdminSidebar activeItem="categories" />
      <main className="acp-main">
        <AdminHeader />

        <div className="acp-header-row">
          <div>
            <h1>Danh mục dịch vụ</h1>
            <p>Quản lý các loại hình dịch vụ và cấu hình ưu tiên, trạng thái hiển thị.</p>
          </div>
          <div>
            <button className="acp-btn-primary" onClick={openNew}><FaPlus /> Thêm dịch vụ</button>
          </div>
        </div>

        <section className="acp-grid">
          {categories.map(cat => (
            <article className="acp-card" key={cat.id}>
                <div className="acp-card-body">
                <div className="acp-card-media" aria-hidden>
                  <div className={`acp-media-badge`}>
                    {cat.iconUrl ? (
                      <img src={cat.iconUrl} alt={cat.title} style={{width:36,height:36,objectFit:'cover',borderRadius:8}} />
                    ) : (
                      <FaImage />
                    )}
                  </div>
                </div>
                <div className="acp-card-content">
                  <strong>{cat.title}</strong>
                  <p>{cat.short}</p>
                </div>
              </div>
              <div className="acp-card-footer">
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span className={`acp-status-pill ${cat.status === 'active' ? 'active' : 'inactive'}`}>
                    {cat.status === 'active' ? 'Hoạt động' : 'Ẩn'}
                  </span>
                  <small>Ưu tiên: {cat.priority === 'high' ? 'Cao' : cat.priority === 'normal' ? 'Bình thường' : 'Thấp'}</small>
                </div>
                <div className="acp-card-actions">
                  <button onClick={() => openEdit(cat)} aria-label="Sửa"><FaPencil /></button>
                  <button onClick={() => remove(cat.id)} aria-label="Xóa"><FaTrash /></button>
                </div>
              </div>
            </article>
          ))}
        </section>

              {isModalOpen && (
          <div className="acp-modal-overlay" role="presentation" onClick={() => setIsModalOpen(false)}>
            <aside className="acp-modal" role="dialog" onClick={(e) => e.stopPropagation()}>
              <header className="acp-modal-head">
                <h2>{editing ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
                <button className="acp-close" onClick={() => setIsModalOpen(false)}>×</button>
              </header>

              <div className="acp-modal-body">
                <label>
                  <span>Icon đại diện</span>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:72,height:72,background:'#f3f4f6',borderRadius:12,display:'grid',placeItems:'center'}}>
                      {mIconUrl ? <img src={mIconUrl} alt="icon" style={{width:56,height:56,objectFit:'cover',borderRadius:8}} /> : <FaImage />}
                    </div>
                    <div>
                      <button type="button" className="acp-btn-ghost" onClick={() => fileInputRef.current?.click()}>Thay đổi icon</button>
                      <div style={{fontSize:12,color:'#94a3b8',marginTop:6}}>Dung lượng tối đa 2MB. Định dạng: SVG, PNG, JPG.</div>
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{display:'none'}} onChange={(e) => { const f = e.target.files?.[0]; if(f) handleIconFile(f); }} />
                </label>
                <label>
                  <span>Tên dịch vụ</span>
                  <input value={mTitle} onChange={(e) => setMTitle(e.target.value)} />
                </label>

                <label>
                  <span>Mô tả ngắn</span>
                  <textarea value={mShort} onChange={(e) => setMShort(e.target.value)} rows={6} />
                </label>

                <label style={{marginTop:12}}>
                  <span>Trạng thái</span>
                  <select value={mStatus} onChange={(e) => setMStatus(e.target.value as Category['status'])}>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ẩn</option>
                  </select>
                </label>

                <label style={{marginTop:12}}>
                  <span>Mức độ ưu tiên</span>
                  <select value={mPriority} onChange={(e) => setMPriority(e.target.value as Category['priority'])}>
                    <option value="high">Cao</option>
                    <option value="normal">Bình thường</option>
                    <option value="low">Thấp</option>
                  </select>
                </label>

                

                </div>

              <div className="acp-modal-footer">
                <div>
                  <button className="acp-btn-ghost" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
                </div>
                <div>
                  <button className="acp-btn-primary" onClick={() => save()}>{editing ? 'Lưu thay đổi' : 'Lưu thay đổi'}</button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCategoriesPage;
