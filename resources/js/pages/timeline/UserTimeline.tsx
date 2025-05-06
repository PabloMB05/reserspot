import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Timeline } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Aquí defines un tipo para tu prop de timeline
interface UserTimelineProps {
  userId?: string;
  actionId?: string;
}

const UserTimeline: React.FC<UserTimelineProps> = ({ userId, actionId }) => {
  const { auth } = usePage().props; // Obtienes la información del usuario autenticado desde Inertia
  const [timelineData, setTimelineData] = useState<any[]>([]);

  useEffect(() => {
    // Determinas cuál usuario utilizar: el pasado por props o el usuario autenticado
    const currentUserId = userId || auth.user.id;
    const currentActionId = actionId || 'default'; // Si no hay actionId, usamos un valor por defecto

    // Realizas la llamada a la API para obtener el timeline
    fetch(`/user/${currentUserId}/timeline/${currentActionId}`) // Llamada a la API
      .then(res => res.json())
      .then(data => setTimelineData(data))
      .catch(error => console.error("Error fetching timeline:", error));
  }, [userId, actionId, auth.user.id]);

  return (
    <div>
      <h2>Timeline de {userId ? userId : auth.user.name}</h2>
      <Timeline>
        {timelineData.map((event, index) => (
          <Timeline.Item key={index} dot={<UserOutlined />} color="green">
            {event.description} <br />
            <small>{event.date}</small>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default UserTimeline;
