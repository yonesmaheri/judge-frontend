import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ShowTests({ results }: { results: any[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          مشاهده
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>نتایج تست‌ها</DialogTitle>
        </DialogHeader>
        <div dir="rtl" className="space-y-3 max-h-[400px] overflow-y-auto">
          {results.map((test:any, idx:number) => (
            <div
              key={idx}
              className={`p-3 rounded border ${
                test.passed
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <p className="text-sm font-medium">
                تست {idx + 1} –{" "}
                {test.passed ? (
                  <span className="text-green-600">موفق</span>
                ) : (
                  <span className="text-red-600">ناموفق</span>
                )}
              </p>
              {test.passed ? (
                <p className="text-xs text-gray-700">جواب صحیح</p>
              ) : (
                <div className="mt-1 space-y-1 text-xs text-gray-700 flex items-center justify-between">
                  <p>ورودی: {test.input}</p>
                  <p>خروجی مورد انتظار: {test.expected}</p>
                  <p>خروجی برنامه: {test.output}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowTests;
