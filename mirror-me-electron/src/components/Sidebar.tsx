import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import x from './Sidebar.scss';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(!open);

  return (
    <div>
      <Card className={x.sidebar}>
        <Button className={x.button} onClick={handleClick}>
          Menu
        </Button>
        {open && (
          <Card className={x.card}>
            <Card.Title className={x.cardtitle}> MirrorMe</Card.Title>
            <Card>
              <Link to="/empty">empty</Link>
            </Card>
            <Card>
              <Link to="/empty">empty</Link>
            </Card>
            <Card>
              <Link to="/empty">empty</Link>
            </Card>
            <Card>
              <Link to="/settings">Settings</Link>
            </Card>
            <Card>
              <Link to="/signup">sign up</Link>
            </Card>
          </Card>
        )}
      </Card>
    </div>
  );
};
export default Sidebar;
