import { Button, Card } from '@/components/ui';

const ProfileCardDemo = () => (
  <Card className="max-w-md mx-auto">
    <div className="flex flex-col items-center space-y-4">
      <img
        className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100"
        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
        alt="User profile"
      />
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">Alexia Montreal</h3>
        <p className="text-md text-gray-500">Lead Product Designer</p>
      </div>
      <div className="flex space-x-4 pt-2">
        <Button variant="primary">Follow</Button>
        <Button variant="secondary">Message</Button>
      </div>
      <div className="w-full text-left pt-4">
        <p className="text-sm text-gray-600">
          Passionate about creating intuitive user experiences that bridge the
          gap between users and technology. Avid hiker and coffee enthusiast.
        </p>
      </div>
    </div>
  </Card>
);

export default ProfileCardDemo;
