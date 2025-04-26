import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useAxios from "@/app/utils/useAxios";
import { useToast } from "@/app/utils/useToast";

interface ScoreDialogProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeTaken: number;
}

const ScoreDialog = ({
  score,
  correctCount,
  totalQuestions,
  timeTaken,
}: ScoreDialogProps) => {
  const api = useAxios();
  const { toastError, toastSuccess } = useToast();
  const [open, setOpen] = React.useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/score", {
        score,
        timeTaken,
      });

      if (response.data.success) {
        toastSuccess("Score saved.");
        window.location.reload();
      } else {
        toastError("An error occurred.");
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[580px] p-[30px]"
          onInteractOutside={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="mt-8 flex flex-col gap-5 text-center">
              <i
                className={`fad ${
                  correctCount >= 14
                    ? "fa-check-circle text-primary"
                    : "fa-times-circle text-destructive"
                } text-[98px]`}
              />
              <div>
                <span
                  className={`text-xl font-bold text-center ${
                    correctCount >= 14 ? "text-primary" : "text-destructive"
                  }`}
                >
                  {correctCount >= 14 ? "You passed!" : "You failed!"}
                </span>

                <div className="flex gap-1 mt-5 mb-1 py-4 px-6 border-[#ccc] border-2 rounded-md max-w-[75%] mx-auto">
                  <i className="fad fa-star mr-3 text-primary" />
                  <span>Score Gained</span>
                  <span
                    className={`${
                      correctCount >= 14 ? "text-primary" : "text-destructive"
                    } font-bold ml-auto`}
                  >
                    {score}
                  </span>
                  / 100
                </div>
                <div className="flex gap-1 mt-4 py-4 px-6 border-[#ccc] border-2 rounded-md max-w-[75%] mx-auto">
                  <i className="fad fa-check mr-3 text-primary" />
                  <span>Correct Answers</span>
                  <span
                    className={`${
                      correctCount >= 14 ? "text-primary" : "text-destructive"
                    } font-bold ml-auto`}
                  >
                    {correctCount}
                  </span>
                  / <span className="font-bold">{totalQuestions}</span>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <DialogClose
              asChild
              onClick={() => {
                handleSubmit();
              }}
            >
              <Button
                className="mt-4 h-[50px] hover:outline-primary hover:text-primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Restart Quiz
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={() => handleSubmit()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex flex-col gap-5 text-center">
            <i
              className={`fad ${
                correctCount >= 14
                  ? "fa-check-circle text-primary"
                  : "fa-times-circle text-destructive"
              } text-[98px]`}
            />
            <div>
              <span
                className={`text-xl font-bold text-center ${
                  correctCount >= 14 ? "text-primary" : "text-destructive"
                }`}
              >
                {correctCount >= 14 ? "You passed!" : "You failed!"}
              </span>
              <div className="flex gap-1 mt-5 mb-1 py-4 px-6 border-[#ccc] border-2 rounded-md mx-auto">
                <i className="fad fa-star mr-3 text-primary" />
                <span>Score Gained</span>
                <span
                  className={`${
                    correctCount >= 14 ? "text-primary" : "text-destructive"
                  } font-bold ml-auto`}
                >
                  {score}
                </span>
                / 100
              </div>
              <div className="flex gap-1 mt-4 py-4 px-6 border-[#ccc] border-2 rounded-md mx-auto">
                <i className="fad fa-check mr-3 text-primary" />
                <span>Correct Answers</span>
                <span
                  className={`${
                    correctCount >= 14 ? "text-primary" : "text-destructive"
                  } font-bold ml-auto`}
                >
                  {correctCount}
                </span>
                / <span className="font-bold">{totalQuestions}</span>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              className="mt-4 h-[50px]"
              onClick={() => {
                handleSubmit();
              }}
            >
              Restart Quiz
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ScoreDialog;
