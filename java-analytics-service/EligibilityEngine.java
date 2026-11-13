import java.util.*;

public class EligibilityEngine {
    public static class StudentProfile {
        String rollNumber;
        double tenthPercentage;
        double twelfthPercentage;
        double currentCgpa;

        public StudentProfile(String rollNumber, double tenth, double twelfth, double cgpa) {
            this.rollNumber = rollNumber;
            this.tenthPercentage = tenth;
            this.twelfthPercentage = twelfth;
            this.currentCgpa = cgpa;
        }
    }

    public static boolean isEligibleForDrive(StudentProfile student, double minSchoolPercent, double minCgpa) {
        return student.tenthPercentage >= minSchoolPercent 
            && student.twelfthPercentage >= minSchoolPercent 
            && student.currentCgpa >= minCgpa;
    }

    public static List<String> getTopDsaTopics(List<List<String>> allExperienceTags, int topK) {
        Map<String, Integer> freqMap = new HashMap<>();
        for (List<String> tags : allExperienceTags) {
            for (String tag : tags) {
                freqMap.put(tag, freqMap.getOrDefault(tag, 0) + 1);
            }
        }
        PriorityQueue<String> minHeap = new PriorityQueue<>(
            (a, b) -> freqMap.get(a).equals(freqMap.get(b)) 
                ? b.compareTo(a) 
                : freqMap.get(a) - freqMap.get(b)
        );

        for (String topic : freqMap.keySet()) {
            minHeap.offer(topic);
            if (minHeap.size() > topK) {
                minHeap.poll();
            }
        }

        List<String> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(0, minHeap.poll());
        }
        return result;
    }

    public static void main(String[] args) {
        StudentProfile student = new StudentProfile("24BIT105", 84.00, 91.83, 8.135);
        System.out.println("Eligible for Rolls-Royce Drive: " + isEligibleForDrive(student, 75.0, 8.0));
    }
}