import React, { useState } from 'react';

const AboutPage = () => {
  // สถานะสำหรับเก็บข้อมูลชื่อและ Ext
  const [name, setName] = useState('Engi_Nong');
  const [ext, setExt] = useState('5008');

  // ฟังก์ชันจัดการเมื่อคลิกปุ่ม Answer
  const handleAnswerClick = async () => {
    const accessToken = 'UZjXpJRNCdMwNOOfRJMK1Q3OZO1kQKzP'; // เปลี่ยนเป็น access_token ที่แท้จริงของคุณ
    const channelId = 'PJSIP/trunk-test-peer-trunking-endpoint-0000008f'; // ใช้ channel_id ที่ได้รับ
    const apiUrl = `/openapi/v1.0/call/accept_inbound?access_token=${accessToken}&channel_id=${channelId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // ใช้วิธีการ POST หรือ GET ตาม API ของคุณ
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('การตอบสนองจาก API:', data);

        // ตรวจสอบว่า API ตอบสนองด้วยข้อมูลที่จำเป็นหรือไม่
        if (data.name && data.ext) {
          setName(data.name);  // อัปเดตชื่อ
          setExt(data.ext);    // อัปเดต Extension

          // เปิดหน้าเว็บ PBX เพื่อรับสาย
          window.open('https://nong20123.ras.yeastar.com', '_blank');
        }
      } else {
        console.error('การเรียก API ล้มเหลว:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('ข้อผิดพลาดที่เกิดขึ้นระหว่างการเรียก API:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <img
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/74268828_2186597561640157_2831256456001486848_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEVhxxHEJ5CBu6xWmqBfKh545j-HUQhzUPjmP4dRCHNQ-SNMCsqbUSE3glWtCG-dNUfDX7mukqYOtm_wPAliXar&_nc_ohc=JDMlubRFAy0Q7kNvgGf4MgA&_nc_ht=scontent.fbkk12-2.fna&oh=00_AYAbxuGowO_y4wO0z2ks-wTvu4PKuzJHOJ1f9cZzghXB6A&oe=66E28FD4"
          alt="Profile of Engi_Nong"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">Ext. {ext}</p>
        <div className="flex justify-between mb-4">
          {/* เพิ่มเนื้อหาเพิ่มเติมที่นี่หากจำเป็น */}
        </div>
        <div className="flex justify-between">
          <button 
            className="px-10 py-3 rounded-full button-answer" 
            aria-label="Answer"
            onClick={handleAnswerClick}
          >
            Answer
          </button>
          <button 
            className="px-11 py-2 rounded-full button-reject" 
            aria-label="Reject"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
