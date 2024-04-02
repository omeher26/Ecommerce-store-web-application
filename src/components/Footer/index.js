import Typography from "antd/es/typography/Typography";



function AppFooter() {
    return(
    <div className="appFooter" >
      <Typography.Link href="https://www.google.com" >Privacy Policy</Typography.Link>
      <Typography.Link href="https://www.google.com" >Terms & Conditions</Typography.Link>
      <Typography.Link href="https://www.google.com" >Return Policy</Typography.Link>
      <Typography.Link href="https://www.google.com" >+123456789</Typography.Link>
    </div>
  );
}

export default AppFooter;