const RejectedSignIn = (props: any) => {
  if (props.rejected) {
    return (
      <>
        <div className=" text-center bg-danger">
          That username and/or password is not correct. Please try again.
        </div>
      </>
    );
  }
  return <></>;
};

export default RejectedSignIn;
